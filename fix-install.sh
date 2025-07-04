#!/bin/bash

echo "🔧 Sửa lỗi cài đặt dependencies..."

# Xóa node_modules và package-lock.json
echo "🗑️ Xóa node_modules và package-lock.json..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Clear npm cache
echo "🧹 Clear npm cache..."
npm cache clean --force

# Cài đặt lại với legacy peer deps
echo "📦 Cài đặt dependencies..."
npm install --legacy-peer-deps

echo "✅ Hoàn tất! Bây giờ chạy: npm run dev"
