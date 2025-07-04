#!/bin/bash

# Hướng dẫn cài đặt dự án PERL & Python Learning System

echo "🚀 Bắt đầu cài đặt dự án..."

# 1. Kiểm tra Node.js
echo "📋 Kiểm tra Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js chưa được cài đặt!"
    echo "Vui lòng tải và cài đặt Node.js từ: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

# 2. Kiểm tra npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm chưa được cài đặt!"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm version: $NPM_VERSION"

# 3. Cài đặt dependencies
echo "📦 Cài đặt các thư viện..."
npm install

# 4. Cài đặt các thư viện bổ sung nếu cần
echo "📦 Cài đặt thư viện bổ sung..."
npm install @types/bcryptjs bcryptjs jsonwebtoken @types/jsonwebtoken

# 5. Tạo file .env.local
echo "⚙️ Tạo file cấu hình..."
if [ ! -f .env.local ]; then
    cat > .env.local << EOL
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/perl_python_learning"

# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"

# JWT Secret
JWT_SECRET="your_super_secret_jwt_key_here_make_it_long_and_random"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOL
    echo "✅ Đã tạo file .env.local"
else
    echo "⚠️ File .env.local đã tồn tại"
fi

echo "🎉 Cài đặt hoàn tất!"
echo ""
echo "📝 Các bước tiếp theo:"
echo "1. Cấu hình database trong file .env.local"
echo "2. Chạy lệnh: npm run dev"
echo "3. Mở trình duyệt tại: http://localhost:3000"
