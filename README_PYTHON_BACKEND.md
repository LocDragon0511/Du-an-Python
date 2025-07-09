# PERL & Python Learning System - Python Backend

Hệ thống backend hoàn toàn bằng Python cho dự án học tập PERL & Python - Đồ án môn CS466 DTU

## 🚀 Tính năng

- **FastAPI Framework**: API hiện đại, nhanh chóng với tự động tạo documentation
- **SQLAlchemy ORM**: Quản lý database mạnh mẽ và linh hoạt
- **JWT Authentication**: Xác thực an toàn với JSON Web Tokens
- **PostgreSQL**: Database quan hệ mạnh mẽ
- **Pydantic**: Validation dữ liệu tự động
- **CORS Support**: Hỗ trợ cross-origin requests
- **Automatic Documentation**: Swagger UI và ReDoc tự động

## 📋 Yêu cầu hệ thống

- Python 3.8+
- PostgreSQL 12+
- pip hoặc conda

## 🛠️ Cài đặt

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd perl-python-learning-system
```

### Bước 2: Tạo môi trường ảo Python
```bash
# Tạo môi trường ảo
python -m venv venv

# Kích hoạt môi trường ảo
# Trên Windows:
venv\Scripts\activate

# Trên Linux/Mac:
source venv/bin/activate
```

### Bước 3: Cài đặt dependencies
```bash
pip install -r requirements.txt
```

### Bước 4: Cấu hình database
1. Cài đặt PostgreSQL
2. Tạo database mới:
```sql
CREATE DATABASE perl_python_learning;
CREATE USER your_username WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE perl_python_learning TO your_username;
```

### Bước 5: Cấu hình environment
```bash
# Copy file cấu hình mẫu
cp .env.example .env

# Chỉnh sửa file .env với thông tin database của bạn
nano .env
```

Ví dụ file `.env`:
```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/perl_python_learning
SECRET_KEY=your-very-long-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=true
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Bước 6: Khởi tạo database
```bash
# Tạo tables và dữ liệu mẫu
python backend/init_db.py
```

### Bước 7: Chạy server
```bash
# Chạy với script tiện ích
python run_backend.py

# Hoặc chạy trực tiếp với uvicorn
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký

### Users
- `GET /api/users/me` - Lấy thông tin user hiện tại
- `PUT /api/users/me` - Cập nhật profile
- `GET /api/users/` - Lấy danh sách users (admin only)
- `GET /api/users/{user_id}` - Lấy thông tin user cụ thể
- `PUT /api/users/{user_id}` - Cập nhật user (admin only)
- `DELETE /api/users/{user_id}` - Xóa/archive user (admin only)

### Courses
- `GET /api/courses/` - Lấy danh sách khóa học
- `GET /api/courses/{course_id}` - Lấy thông tin khóa học cụ thể
- `POST /api/courses/` - Tạo khóa học mới (teacher/admin)
- `PUT /api/courses/{course_id}` - Cập nhật khóa học
- `DELETE /api/courses/{course_id}` - Xóa khóa học (admin only)
- `POST /api/courses/{course_id}/enroll` - Đăng ký khóa học
- `GET /api/courses/my/enrollments` - Lấy danh sách khóa học đã đăng ký

### System
- `GET /` - Thông tin API
- `GET /health` - Health check
- `GET /api/info` - Thông tin API chi tiết

## 📚 Documentation

Khi server đang chạy, bạn có thể truy cập:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 👥 Tài khoản mặc định

Sau khi chạy `init_db.py`, bạn có thể sử dụng các tài khoản sau:

- **Admin**: admin@dtu.edu.vn / admin123
- **Teacher**: teacher@dtu.edu.vn / teacher123
- **Student**: student@dtu.edu.vn / student123
- **Student 2**: student2@dtu.edu.vn / student123

## 🗂️ Cấu trúc dự án

```
backend/
├── __init__.py              # Package init
├── main.py                  # FastAPI application
├── config.py                # Configuration settings
├── database.py              # Database connection
├── models.py                # SQLAlchemy models
├── schemas.py               # Pydantic schemas
├── auth.py                  # Authentication utilities
├── init_db.py              # Database initialization
└── routers/                 # API routers
    ├── __init__.py
    ├── auth.py             # Authentication endpoints
    ├── users.py            # User management
    └── courses.py          # Course management

requirements.txt             # Python dependencies
.env.example                # Environment configuration example
run_backend.py              # Backend startup script
```

## 🔧 Development

### Chạy tests
```bash
pytest
```

### Tạo migration (nếu có thay đổi models)
```bash
# Tạo migration file
alembic revision --autogenerate -m "Description of changes"

# Áp dụng migration
alembic upgrade head
```

### Debugging
```bash
# Chạy với debug mode
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload --log-level debug
```

## 🐳 Docker (Optional)

Tạo file `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Chạy với Docker:
```bash
docker build -t perl-python-backend .
docker run -p 8000:8000 perl-python-backend
```

## 🔒 Security

- JWT tokens với thời gian hết hạn có thể cấu hình
- Password hashing với bcrypt
- CORS protection
- SQL injection protection qua SQLAlchemy ORM
- Input validation với Pydantic

## 📊 Monitoring

- Request timing middleware
- Comprehensive logging
- Error tracking
- Health check endpoint

## 🚀 Production Deployment

### Với Gunicorn
```bash
pip install gunicorn
gunicorn backend.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Environment Variables cho Production
```env
DEBUG=false
SECRET_KEY=your-production-secret-key-very-long-and-random
DATABASE_URL=postgresql://user:password@production-db:5432/database
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🆘 Troubleshooting

### Database Connection Error
1. Kiểm tra PostgreSQL đang chạy
2. Xác nhận thông tin kết nối trong `.env`
3. Kiểm tra firewall và network

### Import Errors
```bash
# Reinstall dependencies
pip uninstall -r requirements.txt -y
pip install -r requirements.txt
```

### Permission Errors
```bash
# Đảm bảo user có quyền trên database
GRANT ALL PRIVILEGES ON DATABASE perl_python_learning TO your_username;
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📞 Hỗ trợ

- Email: tranhminhdang@dtu.edu.vn
- GitHub Issues: [Link repository]

## 📄 License

Dự án này được phát triển cho mục đích học tập tại Đại học Duy Tân.