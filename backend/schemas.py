from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums
class UserRole(str, Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"

class UserStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class CourseLanguage(str, Enum):
    PERL = "perl"
    PYTHON = "python"

class CourseLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class CourseStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole
    student_id: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    status: Optional[UserStatus] = None

class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    status: UserStatus
    email_verified: bool
    last_login: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

# Auth schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(UserCreate):
    pass

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class AuthResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    data: Optional[TokenResponse] = None

# Course schemas
class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    language: CourseLanguage
    level: CourseLevel
    duration_weeks: Optional[int] = None
    thumbnail_url: Optional[str] = None

class CourseCreate(CourseBase):
    instructor_id: Optional[int] = None

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    language: Optional[CourseLanguage] = None
    level: Optional[CourseLevel] = None
    duration_weeks: Optional[int] = None
    thumbnail_url: Optional[str] = None
    status: Optional[CourseStatus] = None

class CourseResponse(CourseBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    instructor_id: Optional[int] = None
    status: CourseStatus
    created_at: datetime
    updated_at: datetime
    instructor: Optional[UserResponse] = None

# Course Enrollment schemas
class EnrollmentBase(BaseModel):
    course_id: int

class EnrollmentCreate(EnrollmentBase):
    pass

class EnrollmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    user_id: int
    course_id: int
    enrolled_at: datetime
    completed_at: Optional[datetime] = None
    progress_percentage: int
    course: Optional[CourseResponse] = None
    user: Optional[UserResponse] = None

# System Log schemas
class SystemLogCreate(BaseModel):
    action: str
    details: Optional[dict] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class SystemLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    user_id: Optional[int] = None
    action: str
    details: Optional[dict] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime
    user: Optional[UserResponse] = None

# Response models
class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None

class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[dict] = None