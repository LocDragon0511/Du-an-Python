from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from ..database import get_db
from ..models import Course, User, CourseEnrollment, SystemLog
from ..schemas import (
    CourseCreate, CourseUpdate, CourseResponse, 
    EnrollmentCreate, EnrollmentResponse,
    SuccessResponse
)
from ..auth import get_current_user, get_teacher_or_admin_user, get_admin_user

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/", response_model=List[CourseResponse])
async def get_courses(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    language: Optional[str] = Query(None),
    level: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all courses with optional filtering."""
    query = db.query(Course).filter(Course.status == "published")
    
    # Apply filters
    if language:
        query = query.filter(Course.language == language)
    if level:
        query = query.filter(Course.level == level)
    if search:
        query = query.filter(
            or_(
                Course.title.ilike(f"%{search}%"),
                Course.description.ilike(f"%{search}%")
            )
        )
    
    courses = query.offset(skip).limit(limit).all()
    return courses

@router.get("/{course_id}", response_model=CourseResponse)
async def get_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific course by ID."""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if user can access this course
    if course.status != "published" and current_user.role not in ["teacher", "admin"]:
        if course.instructor_id != current_user.id:
            raise HTTPException(status_code=403, detail="Access denied")
    
    return course

@router.post("/", response_model=CourseResponse)
async def create_course(
    course_data: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_teacher_or_admin_user)
):
    """Create a new course."""
    # Set instructor_id to current user if not provided
    if not course_data.instructor_id:
        course_data.instructor_id = current_user.id
    
    # Verify instructor exists and has permission
    if course_data.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Cannot assign course to another instructor")
    
    instructor = db.query(User).filter(User.id == course_data.instructor_id).first()
    if not instructor or instructor.role not in ["teacher", "admin"]:
        raise HTTPException(status_code=400, detail="Invalid instructor")
    
    course = Course(**course_data.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    
    # Log course creation
    log = SystemLog(
        user_id=current_user.id,
        action="course_created",
        details={"course_id": course.id, "title": course.title}
    )
    db.add(log)
    db.commit()
    
    return course

@router.put("/{course_id}", response_model=CourseResponse)
async def update_course(
    course_id: int,
    course_data: CourseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_teacher_or_admin_user)
):
    """Update a course."""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check permissions
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Update course fields
    update_data = course_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(course, field, value)
    
    db.commit()
    db.refresh(course)
    
    # Log course update
    log = SystemLog(
        user_id=current_user.id,
        action="course_updated",
        details={"course_id": course.id, "changes": update_data}
    )
    db.add(log)
    db.commit()
    
    return course

@router.delete("/{course_id}")
async def delete_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """Delete a course (admin only)."""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check for existing enrollments
    enrollments = db.query(CourseEnrollment).filter(CourseEnrollment.course_id == course_id).count()
    if enrollments > 0:
        # Archive instead of delete if there are enrollments
        course.status = "archived"
        db.commit()
        
        log = SystemLog(
            user_id=current_user.id,
            action="course_archived",
            details={"course_id": course.id, "reason": "has_enrollments"}
        )
        db.add(log)
        db.commit()
        
        return SuccessResponse(message="Course archived due to existing enrollments")
    
    db.delete(course)
    db.commit()
    
    log = SystemLog(
        user_id=current_user.id,
        action="course_deleted",
        details={"course_id": course.id, "title": course.title}
    )
    db.add(log)
    db.commit()
    
    return SuccessResponse(message="Course deleted successfully")

# Enrollment endpoints
@router.post("/{course_id}/enroll", response_model=EnrollmentResponse)
async def enroll_in_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Enroll in a course."""
    # Check if course exists and is published
    course = db.query(Course).filter(Course.id == course_id, Course.status == "published").first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found or not available")
    
    # Check if already enrolled
    existing_enrollment = db.query(CourseEnrollment).filter(
        CourseEnrollment.user_id == current_user.id,
        CourseEnrollment.course_id == course_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")
    
    # Create enrollment
    enrollment = CourseEnrollment(
        user_id=current_user.id,
        course_id=course_id
    )
    
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    
    # Log enrollment
    log = SystemLog(
        user_id=current_user.id,
        action="course_enrolled",
        details={"course_id": course_id, "course_title": course.title}
    )
    db.add(log)
    db.commit()
    
    return enrollment

@router.get("/{course_id}/enrollments", response_model=List[EnrollmentResponse])
async def get_course_enrollments(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_teacher_or_admin_user)
):
    """Get all enrollments for a course (teachers and admins only)."""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check permissions
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    enrollments = db.query(CourseEnrollment).filter(CourseEnrollment.course_id == course_id).all()
    return enrollments

@router.get("/my/enrollments", response_model=List[EnrollmentResponse])
async def get_my_enrollments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's enrollments."""
    enrollments = db.query(CourseEnrollment).filter(CourseEnrollment.user_id == current_user.id).all()
    return enrollments