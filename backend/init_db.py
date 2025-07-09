#!/usr/bin/env python3
"""
Database initialization script for PERL & Python Learning System.
This script creates tables and populates them with initial data.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine, Base
from backend.models import User, Course, CourseEnrollment
from backend.auth import get_password_hash
from backend.config import settings

def create_tables():
    """Create all database tables."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")

def create_sample_users(db: Session):
    """Create sample users."""
    print("Creating sample users...")
    
    sample_users = [
        {
            "email": "admin@dtu.edu.vn",
            "password": "admin123",
            "full_name": "Quản trị viên",
            "role": "admin",
            "status": "active"
        },
        {
            "email": "teacher@dtu.edu.vn", 
            "password": "teacher123",
            "full_name": "TS. Nguyễn Văn A",
            "role": "teacher",
            "status": "active"
        },
        {
            "email": "student@dtu.edu.vn",
            "password": "student123", 
            "full_name": "Nguyễn Văn Nam",
            "role": "student",
            "student_id": "102200001",
            "status": "active"
        },
        {
            "email": "student2@dtu.edu.vn",
            "password": "student123",
            "full_name": "Trần Thị Lan",
            "role": "student", 
            "student_id": "102200002",
            "status": "active"
        }
    ]
    
    for user_data in sample_users:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data["email"]).first()
        if existing_user:
            print(f"⚠️  User {user_data['email']} already exists, skipping...")
            continue
            
        password = user_data.pop("password")
        user = User(
            **user_data,
            password_hash=get_password_hash(password)
        )
        db.add(user)
        print(f"✅ Created user: {user_data['email']}")
    
    db.commit()

def create_sample_courses(db: Session):
    """Create sample courses."""
    print("Creating sample courses...")
    
    # Get teacher user
    teacher = db.query(User).filter(User.email == "teacher@dtu.edu.vn").first()
    if not teacher:
        print("⚠️  Teacher user not found, skipping course creation")
        return
    
    sample_courses = [
        {
            "title": "Python Cơ Bản",
            "description": "Khóa học Python dành cho người mới bắt đầu",
            "language": "python",
            "level": "beginner",
            "duration_weeks": 8,
            "instructor_id": teacher.id,
            "status": "published"
        },
        {
            "title": "Python Nâng Cao",
            "description": "Khóa học Python nâng cao với các framework hiện đại",
            "language": "python", 
            "level": "advanced",
            "duration_weeks": 12,
            "instructor_id": teacher.id,
            "status": "published"
        },
        {
            "title": "Perl Cơ Bản",
            "description": "Khóa học Perl dành cho người mới bắt đầu",
            "language": "perl",
            "level": "beginner", 
            "duration_weeks": 6,
            "instructor_id": teacher.id,
            "status": "published"
        },
        {
            "title": "Perl Xử Lý Văn Bản",
            "description": "Sử dụng Perl để xử lý văn bản và biểu thức chính quy",
            "language": "perl",
            "level": "intermediate",
            "duration_weeks": 8,
            "instructor_id": teacher.id,
            "status": "draft"
        }
    ]
    
    for course_data in sample_courses:
        # Check if course already exists
        existing_course = db.query(Course).filter(Course.title == course_data["title"]).first()
        if existing_course:
            print(f"⚠️  Course '{course_data['title']}' already exists, skipping...")
            continue
            
        course = Course(**course_data)
        db.add(course)
        print(f"✅ Created course: {course_data['title']}")
    
    db.commit()

def create_sample_enrollments(db: Session):
    """Create sample enrollments."""
    print("Creating sample enrollments...")
    
    # Get student users
    student1 = db.query(User).filter(User.email == "student@dtu.edu.vn").first()
    student2 = db.query(User).filter(User.email == "student2@dtu.edu.vn").first()
    
    # Get published courses
    courses = db.query(Course).filter(Course.status == "published").all()
    
    if not student1 or not student2 or not courses:
        print("⚠️  Required users or courses not found, skipping enrollment creation")
        return
    
    # Enroll students in courses
    enrollments = [
        {"user_id": student1.id, "course_id": courses[0].id, "progress_percentage": 25},
        {"user_id": student1.id, "course_id": courses[2].id, "progress_percentage": 10},
        {"user_id": student2.id, "course_id": courses[0].id, "progress_percentage": 50},
        {"user_id": student2.id, "course_id": courses[1].id, "progress_percentage": 5}
    ]
    
    for enrollment_data in enrollments:
        # Check if enrollment already exists
        existing = db.query(CourseEnrollment).filter(
            CourseEnrollment.user_id == enrollment_data["user_id"],
            CourseEnrollment.course_id == enrollment_data["course_id"]
        ).first()
        
        if existing:
            continue
            
        enrollment = CourseEnrollment(**enrollment_data)
        db.add(enrollment)
        print(f"✅ Created enrollment: User {enrollment_data['user_id']} -> Course {enrollment_data['course_id']}")
    
    db.commit()

def main():
    """Main initialization function."""
    print("🚀 Initializing PERL & Python Learning System Database...")
    print(f"Database URL: {settings.DATABASE_URL}")
    
    try:
        # Create tables
        create_tables()
        
        # Create database session
        db = SessionLocal()
        
        try:
            # Create sample data
            create_sample_users(db)
            create_sample_courses(db)
            create_sample_enrollments(db)
            
            print("\n✅ Database initialization completed successfully!")
            print("\n📋 Default Login Credentials:")
            print("   Admin: admin@dtu.edu.vn / admin123")
            print("   Teacher: teacher@dtu.edu.vn / teacher123")
            print("   Student: student@dtu.edu.vn / student123")
            print("   Student 2: student2@dtu.edu.vn / student123")
            
        finally:
            db.close()
            
    except Exception as e:
        print(f"❌ Error during initialization: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()