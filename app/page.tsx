"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Code,
  MessageSquare,
  Users,
  BarChart3,
  Loader2,
  Play,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Smartphone,
  Clock,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalStudents: 1247,
    totalCourses: 12,
    completedAssignments: 8934,
    averageRating: 4.8,
  })

  // Don't redirect if user is logged in - show homepage for everyone
  const featuredCourses = [
    {
      id: 1,
      title: "Python Fundamentals",
      description: "Học Python từ cơ bản đến nâng cao với các dự án thực tế",
      language: "Python",
      level: "Cơ bản",
      students: 245,
      rating: 4.8,
      duration: "8 tuần",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "PERL Advanced Programming",
      description: "Khám phá sức mạnh của PERL trong xử lý văn bản và hệ thống",
      language: "PERL",
      level: "Nâng cao",
      students: 128,
      rating: 4.6,
      duration: "10 tuần",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Python Web Development",
      description: "Xây dựng ứng dụng web hiện đại với Flask và Django",
      language: "Python",
      level: "Trung cấp",
      students: 189,
      rating: 4.9,
      duration: "12 tuần",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Sinh viên IT",
      content: "Khóa học Python rất chi tiết và dễ hiểu. AI chatbot hỗ trợ 24/7 rất hữu ích!",
      rating: 5,
      avatar: "A",
    },
    {
      name: "Trần Thị B",
      role: "Developer",
      content: "IDE trực tuyến rất tiện lợi, không cần cài đặt gì mà vẫn code được ngay.",
      rating: 5,
      avatar: "B",
    },
    {
      name: "Lê Văn C",
      role: "Data Analyst",
      content: "Học PERL ở đây giúp tôi xử lý dữ liệu hiệu quả hơn rất nhiều.",
      rating: 4,
      avatar: "C",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PERL & PYTHON Learning</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
              Khóa học
            </Link>
            <Link href="/practice" className="text-gray-700 hover:text-blue-600 transition-colors">
              Thực hành
            </Link>
            <Link href="/chat" className="text-gray-700 hover:text-blue-600 transition-colors">
              AI Chat
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Giới thiệu
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.full_name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium hidden md:block">{user.full_name}</span>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Đăng nhập</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 text-white">Đăng ký</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                <span>Học lập trình với AI hỗ trợ</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Học <span className="text-blue-600">PERL & Python</span>
                <br />
                <span className="text-purple-600">Hiệu quả nhất</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Nền tảng học lập trình hiện đại với IDE trực tuyến, AI chatbot thông minh và hệ thống chấm điểm tự động.
                Từ cơ bản đến chuyên sâu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {user ? (
                  <Link href="/courses">
                    <Button size="lg" className="bg-blue-600 text-white px-8 py-4 text-lg">
                      Xem khóa học
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/register">
                    <Button size="lg" className="bg-blue-600 text-white px-8 py-4 text-lg">
                      Bắt đầu học ngay
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}

                <Link href="/practice">
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                    <Play className="mr-2 h-5 w-5" />
                    Thử nghiệm IDE
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>{stats.totalStudents.toLocaleString()}+ học viên</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>{stats.totalCourses} khóa học</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span>{stats.averageRating}/5 đánh giá</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">IDE Online - Python</span>
                </div>
                <div className="font-mono text-sm">
                  <div className="text-gray-500"># Chào mừng đến với Python!</div>
                  <div className="text-blue-400">
                    def <span className="text-yellow-400">hello_world</span>():
                  </div>
                  <div className="text-green-400 ml-4">
                    print(<span className="text-orange-400">"Hello, World!"</span>)
                  </div>
                  <div className="text-green-400 ml-4">
                    print(<span className="text-orange-400">"Học Python cùng AI!"</span>)
                  </div>
                  <div className="text-blue-400 mt-2">hello_world()</div>
                  <div className="text-green-300 mt-2">
                    <div>Hello, World!</div>
                    <div>Học Python cùng AI!</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Auto Grading</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalStudents.toLocaleString()}+</div>
              <div className="text-gray-600">Học viên</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.totalCourses}</div>
              <div className="text-gray-600">Khóa học</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {stats.completedAssignments.toLocaleString()}
              </div>
              <div className="text-gray-600">Bài tập hoàn thành</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{stats.averageRating}</div>
              <div className="text-gray-600">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tại sao chọn chúng tôi?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ thống học tập hiện đại với công nghệ AI tiên tiến, giúp bạn học lập trình hiệu quả nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>IDE Trực tuyến</CardTitle>
                <CardDescription>
                  Môi trường lập trình PERL & Python ngay trên trình duyệt, không cần cài đặt
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>AI Chatbot</CardTitle>
                <CardDescription>Trợ lý AI thông minh hỗ trợ học tập, giải đáp thắc mắc 24/7</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Chấm điểm tự động</CardTitle>
                <CardDescription>Hệ thống chấm bài tự động với feedback chi tiết và gợi ý cải thiện</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Khóa học chất lượng</CardTitle>
                <CardDescription>Nội dung được thiết kế bởi các chuyên gia, từ cơ bản đến nâng cao</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Theo dõi tiến độ</CardTitle>
                <CardDescription>Dashboard chi tiết giúp theo dõi quá trình học tập và thành tích</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Cộng đồng học tập</CardTitle>
                <CardDescription>Kết nối với cộng đồng học viên, thảo luận và chia sẻ kinh nghiệm</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Khóa học nổi bật</h2>
            <p className="text-xl text-gray-600">Các khóa học được yêu thích nhất</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-blue-600" />
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{course.language}</Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} học viên</span>
                    </div>
                  </div>

                  <Link href={user ? `/courses/${course.id}` : "/register"}>
                    <Button className="w-full">{user ? "Xem chi tiết" : "Đăng ký học"}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button size="lg" variant="outline">
                Xem tất cả khóa học
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Học viên nói gì về chúng tôi</h2>
            <p className="text-xl text-gray-600">Những phản hồi tích cực từ cộng đồng học viên</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Sẵn sàng bắt đầu hành trình lập trình?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn học viên đang học PERL & Python với phương pháp hiện đại nhất
          </p>

          {user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
                  Xem khóa học
                </Button>
              </Link>
              <Link href="/practice">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4"
                >
                  Thực hành ngay
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
                  Đăng ký miễn phí
                </Button>
              </Link>
              <Link href="/practice">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4"
                >
                  Dùng thử IDE
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">PERL & PYTHON Learning</span>
              </div>
              <p className="text-gray-400 mb-4">
                Nền tảng học lập trình hiện đại với AI hỗ trợ, giúp bạn thành thạo PERL & Python.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Khóa học</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Python cơ bản
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Python nâng cao
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    PERL Programming
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Web Development
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Công cụ</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/practice" className="hover:text-white transition-colors">
                    IDE Online
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-white transition-colors">
                    AI Chatbot
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Bài tập thực hành
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Kiểm tra trực tuyến
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Hỗ trợ</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tài liệu
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cộng đồng
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">&copy; 2024 PERL & Python Learning System. Đồ án CS466 - DTU.</p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Điều khoản sử dụng
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Chính sách bảo mật
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
