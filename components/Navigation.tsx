"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Home, BookOpen, MessageSquare, User, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"

export default function Navigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "admin":
        return "Quản trị viên"
      case "teacher":
        return "Giảng viên"
      case "student":
        return "Sinh viên"
      default:
        return role
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "teacher":
        return "bg-green-100 text-green-800"
      case "student":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">PERL & PYTHON Learning</span>
            <span className="text-xl font-bold text-gray-900 sm:hidden">P&P Learning</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`flex items-center space-x-1 transition-colors ${
                isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Trang chủ</span>
            </Link>

            <Link
              href="/courses"
              className={`flex items-center space-x-1 transition-colors ${
                pathname.startsWith("/courses") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Khóa học</span>
            </Link>

            <Link
              href="/practice"
              className={`flex items-center space-x-1 transition-colors ${
                isActive("/practice") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Code className="h-4 w-4" />
              <span>Thực hành</span>
            </Link>

            <Link
              href="/chat"
              className={`flex items-center space-x-1 transition-colors ${
                isActive("/chat") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>AI Chat</span>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center space-x-4">
                  <Badge className={getRoleBadgeColor(user.role)}>{getRoleDisplay(user.role)}</Badge>

                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.full_name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{user.full_name}</span>
                  </div>

                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>

                {/* Mobile User Info */}
                <div className="md:hidden flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.full_name.charAt(0)}
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="outline">Đăng nhập</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 text-white">Đăng ký</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                href="/"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Trang chủ</span>
              </Link>

              <Link
                href="/courses"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  pathname.startsWith("/courses") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                <span>Khóa học</span>
              </Link>

              <Link
                href="/practice"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isActive("/practice") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Code className="h-4 w-4" />
                <span>Thực hành</span>
              </Link>

              <Link
                href="/chat"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isActive("/chat") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>AI Chat</span>
              </Link>

              {user ? (
                <>
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.full_name}</div>
                        <Badge className={getRoleBadgeColor(user.role)} size="sm">
                          {getRoleDisplay(user.role)}
                        </Badge>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-gray-50 mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 p-2 rounded-lg text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t pt-4 space-y-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 text-white">Đăng ký</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
