from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models import User, SystemLog
from ..schemas import LoginRequest, RegisterRequest, AuthResponse, TokenResponse, UserResponse
from ..auth import authenticate_user, create_access_token, get_password_hash
from ..config import settings

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login", response_model=AuthResponse)
async def login(
    request: Request,
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    """Login endpoint."""
    # Authenticate user
    user = authenticate_user(db, login_data.email, login_data.password)
    
    if not user:
        # Log failed login attempt
        log = SystemLog(
            action="login_failed",
            details={"email": login_data.email, "reason": "invalid_credentials"},
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent")
        )
        db.add(log)
        db.commit()
        
        return AuthResponse(
            success=False,
            message="Email hoặc mật khẩu không đúng"
        )
    
    if user.status != "active":
        return AuthResponse(
            success=False,
            message="Tài khoản đã bị khóa"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": str(user.id)})
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Log successful login
    log = SystemLog(
        user_id=user.id,
        action="login_success",
        details={"email": user.email},
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent")
    )
    db.add(log)
    db.commit()
    
    # Return response
    token_response = TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(user)
    )
    
    return AuthResponse(
        success=True,
        message="Đăng nhập thành công",
        data=token_response
    )

@router.post("/register", response_model=AuthResponse)
async def register(
    request: Request,
    register_data: RegisterRequest,
    db: Session = Depends(get_db)
):
    """Register endpoint."""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == register_data.email).first()
    if existing_user:
        return AuthResponse(
            success=False,
            message="Email đã được sử dụng"
        )
    
    # Check if student_id already exists (for students)
    if register_data.role == "student" and register_data.student_id:
        existing_student = db.query(User).filter(User.student_id == register_data.student_id).first()
        if existing_student:
            return AuthResponse(
                success=False,
                message="Mã sinh viên đã được sử dụng"
            )
    
    # Create new user
    password_hash = get_password_hash(register_data.password)
    
    new_user = User(
        email=register_data.email,
        password_hash=password_hash,
        full_name=register_data.full_name,
        role=register_data.role,
        student_id=register_data.student_id,
        phone=register_data.phone,
        avatar_url=register_data.avatar_url,
        status="active"
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": str(new_user.id)})
    
    # Log successful registration
    log = SystemLog(
        user_id=new_user.id,
        action="user_registered",
        details={
            "email": new_user.email,
            "role": new_user.role,
            "student_id": new_user.student_id
        },
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent")
    )
    db.add(log)
    db.commit()
    
    # Return response
    token_response = TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(new_user)
    )
    
    return AuthResponse(
        success=True,
        message="Đăng ký thành công",
        data=token_response
    )