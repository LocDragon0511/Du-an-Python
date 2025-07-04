# PERL & Python Learning System

Hệ thống học tập PERL & Python với AI hỗ trợ - Đồ án môn CS466 DTU

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18+ 
- PostgreSQL 14+
- npm hoặc yarn

### Bước 1: Clone dự án
\`\`\`bash
git clone <repository-url>
cd perl-python-learning-system
\`\`\`

### Bước 2: Cài đặt dependencies
\`\`\`bash
npm install
\`\`\`

### Bước 3: Cấu hình database

#### Option 1: PostgreSQL Local
1. Cài đặt PostgreSQL trên máy tính
2. Tạo database mới:
\`\`\`sql
CREATE DATABASE perl_python_learning;
\`\`\`

#### Option 2: Supabase (Recommended)
1. Đăng ký tài khoản tại [supabase.com](https://supabase.com)
2. Tạo project mới
3. Lấy thông tin kết nối từ Settings > Database

### Bước 4: Cấu hình environment
1. Copy file `.env.example` thành `.env.local`
2. Điền thông tin database và các cấu hình khác

### Bước 5: Chạy database migrations
\`\`\`bash
# Tạo tables
npm run db:generate
npm run db:migrate
\`\`\`

### Bước 6: Chạy dự án
\`\`\`bash
npm run dev
\`\`\`

Mở trình duyệt tại: http://localhost:3000

## 🗄️ Database Setup

### Sử dụng Supabase (Khuyến nghị)
1. Truy cập [supabase.com](https://supabase.com)
2. Tạo account và project mới
3. Vào SQL Editor và chạy các script trong thư mục `scripts/`
4. Cập nhật thông tin kết nối trong `.env.local`

### Sử dụng PostgreSQL Local
1. Cài đặt PostgreSQL
2. Tạo database và user
3. Chạy các script SQL trong thư mục `scripts/`

## 👥 Tài khoản demo
- **Admin**: admin@dtu.edu.vn / admin123
- **Giảng viên**: teacher@dtu.edu.vn / teacher123  
- **Sinh viên**: student@dtu.edu.vn / student123

## 📁 Cấu trúc dự án
\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   └── ...
├── components/           # React components
├── lib/                 # Utilities và database
├── contexts/            # React contexts
├── scripts/             # Database scripts
└── public/              # Static files
\`\`\`

## 🛠️ Scripts có sẵn
- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run db:generate` - Generate database schema
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Mở Drizzle Studio

## 🔧 Troubleshooting

### Lỗi database connection
- Kiểm tra DATABASE_URL trong .env.local
- Đảm bảo PostgreSQL đang chạy
- Kiểm tra firewall và network

### Lỗi dependencies
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Lỗi TypeScript
\`\`\`bash
npm run build
\`\`\`

## 📞 Hỗ trợ
- Email: tranhminhdang@dtu.edu.vn
- GitHub Issues: [Link repository]
