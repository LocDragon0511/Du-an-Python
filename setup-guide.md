# 🚀 HƯỚNG DẪN CÀI ĐẶT CHI TIẾT

## Bước 1: Chuẩn bị môi trường

### Cài đặt Node.js
1. Truy cập: https://nodejs.org/
2. Tải phiên bản LTS (18.x hoặc mới hơn)
3. Cài đặt và kiểm tra:
\`\`\`bash
node --version
npm --version
\`\`\`

### Cài đặt Visual Studio Code
1. Tải từ: https://code.visualstudio.com/
2. Cài đặt các extensions hữu ích:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Importer
   - Prettier - Code formatter
   - Auto Rename Tag

## Bước 2: Setup Database

### Option A: Supabase (Khuyến nghị - Miễn phí)
1. Truy cập: https://supabase.com
2. Đăng ký tài khoản
3. Tạo project mới
4. Vào SQL Editor
5. Copy và chạy từng script trong thư mục scripts/:
   - 01-create-database.sql
   - 02-insert-sample-data.sql
   - 03-create-views.sql
   - 04-create-functions.sql

6. Lấy thông tin kết nối:
   - Settings > Database > Connection string
   - Settings > API > Project URL và anon key

### Option B: PostgreSQL Local
1. Tải PostgreSQL: https://www.postgresql.org/download/
2. Cài đặt với password cho user postgres
3. Mở pgAdmin hoặc psql
4. Tạo database:
\`\`\`sql
CREATE DATABASE perl_python_learning;
\`\`\`
5. Chạy các script SQL

## Bước 3: Cài đặt dự án

### Clone hoặc tạo project
\`\`\`bash
# Nếu có git repository
git clone <your-repo-url>
cd perl-python-learning-system

# Hoặc tạo thư mục mới và copy code
mkdir perl-python-learning-system
cd perl-python-learning-system
\`\`\`

### Cài đặt dependencies
\`\`\`bash
npm install
\`\`\`

### Cấu hình environment
1. Copy file .env.example thành .env.local
2. Điền thông tin database:

**Với Supabase:**
\`\`\`env
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"
\`\`\`

**Với PostgreSQL Local:**
\`\`\`env
DATABASE_URL="postgresql://postgres:password@localhost:5432/perl_python_learning"
\`\`\`

## Bước 4: Chạy dự án
\`\`\`bash
npm run dev
\`\`\`

Mở trình duyệt tại: http://localhost:3000

## Bước 5: Test đăng nhập
Sử dụng tài khoản demo:
- Admin: admin@dtu.edu.vn / admin123
- Teacher: teacher@dtu.edu.vn / teacher123
- Student: student@dtu.edu.vn / student123

## 🔧 Xử lý lỗi thường gặp

### Lỗi "Module not found"
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Lỗi database connection
- Kiểm tra DATABASE_URL
- Đảm bảo database đang chạy
- Kiểm tra username/password

### Lỗi TypeScript
\`\`\`bash
npm run build
\`\`\`

### Lỗi port 3000 đã được sử dụng
\`\`\`bash
npx kill-port 3000
# hoặc
npm run dev -- -p 3001
\`\`\`

## 📱 Các lệnh hữu ích

\`\`\`bash
# Development
npm run dev          # Chạy dev server
npm run build        # Build production
npm run start        # Chạy production

# Database
npm run db:generate  # Generate schema
npm run db:migrate   # Run migrations
npm run db:studio    # Mở database studio

# Utilities
npm run lint         # Check code style
npm run type-check   # Check TypeScript
\`\`\`

## 🎯 Kiểm tra cài đặt thành công

1. ✅ Trang chủ hiển thị đúng
2. ✅ Đăng nhập với tài khoản demo
3. ✅ Dashboard hiển thị theo role
4. ✅ IDE online hoạt động
5. ✅ Chat AI phản hồi
6. ✅ Admin panel accessible

Nếu tất cả đều OK, bạn đã cài đặt thành công! 🎉
