from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from ..database import get_db
from ..models import User, SystemLog
from ..schemas import UserResponse, UserUpdate, SuccessResponse
from ..auth import get_current_user, get_admin_user, get_password_hash

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Get current user's profile."""
    return current_user

@router.put("/me", response_model=UserResponse)
async def update_current_user_profile(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update current user's profile."""
    # Update user fields
    update_data = user_data.model_dump(exclude_unset=True)
    
    # Don't allow status changes for non-admin users
    if "status" in update_data and current_user.role != "admin":
        del update_data["status"]
    
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    
    # Log profile update
    log = SystemLog(
        user_id=current_user.id,
        action="profile_updated",
        details={"changes": update_data}
    )
    db.add(log)
    db.commit()
    
    return current_user

@router.get("/", response_model=List[UserResponse])
async def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    role: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """Get all users (admin only)."""
    query = db.query(User)
    
    # Apply filters
    if role:
        query = query.filter(User.role == role)
    if status:
        query = query.filter(User.status == status)
    if search:
        query = query.filter(
            or_(
                User.full_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%"),
                User.student_id.ilike(f"%{search}%")
            )
        )
    
    users = query.offset(skip).limit(limit).all()
    return users

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific user by ID."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check permissions: users can only view their own profile, admins can view all
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    return user

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """Update a user (admin only)."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update user fields
    update_data = user_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    
    # Log user update
    log = SystemLog(
        user_id=current_user.id,
        action="user_updated",
        details={"target_user_id": user_id, "changes": update_data}
    )
    db.add(log)
    db.commit()
    
    return user

@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """Delete a user (admin only)."""
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Archive user instead of deleting to preserve data integrity
    user.status = "inactive"
    db.commit()
    
    # Log user deletion/archival
    log = SystemLog(
        user_id=current_user.id,
        action="user_archived",
        details={"target_user_id": user_id, "email": user.email}
    )
    db.add(log)
    db.commit()
    
    return SuccessResponse(message="User archived successfully")

@router.post("/{user_id}/activate")
async def activate_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """Activate a user account (admin only)."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.status = "active"
    db.commit()
    
    # Log user activation
    log = SystemLog(
        user_id=current_user.id,
        action="user_activated",
        details={"target_user_id": user_id, "email": user.email}
    )
    db.add(log)
    db.commit()
    
    return SuccessResponse(message="User activated successfully")

@router.post("/{user_id}/suspend")
async def suspend_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """Suspend a user account (admin only)."""
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot suspend your own account")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.status = "suspended"
    db.commit()
    
    # Log user suspension
    log = SystemLog(
        user_id=current_user.id,
        action="user_suspended",
        details={"target_user_id": user_id, "email": user.email}
    )
    db.add(log)
    db.commit()
    
    return SuccessResponse(message="User suspended successfully")