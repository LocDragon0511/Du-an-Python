"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Clock, Users, Star, Play } from "lucide-react"
import Navigation from "@/components/Navigation"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterLanguage, setFilterLanguage] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Python Fundamentals",
      description: "Học các khái niệm cơ bản của Python từ biến, hàm đến cấu trúc dữ liệu",
      language: "python",
      level: "beginner",
      duration: "8 tuần",
      students: 245,
      rating: 4.8,
      progress: 75,
      lessons: 24,
      completedLessons: 18,
      instructor: "TS. Nguyễn Văn A",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "PERL Advanced Programming",
      description: "Khám phá các tính năng nâng cao của PERL: regex, file handling, modules",
      language: "perl",
      level: "advanced",
      duration: "10 tuần",
      students: 128,
      rating: 4.6,
      progress: 60,
      lessons: 30,
      completedLessons: 18,
      instructor: "PGS. Trần Thị B",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Python Web Development",
      description: "Xây dựng ứng dụng web với Flask và Django framework",
      language: "python",
      level: "intermediate",
      duration: "12 tuần",
      students: 189,
      rating: 4.9,
      progress: 40,
      lessons: 36,
      completedLessons: 14,
      instructor: "ThS. Lê Văn C",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "PERL Text Processing",
      description: "Xử lý văn bản và dữ liệu với PERL regex và string manipulation",
      language: "perl",
      level: "intermediate",
      duration: "6 tuần",
      students: 95,
      rating: 4.5,
      progress: 0,
      lessons: 18,
      completedLessons: 0,
      instructor: "TS. Phạm Thị D",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Python Data Science",
      description: "Phân tích dữ liệu với NumPy, Pandas và Matplotlib",
      language: "python",
      level: "intermediate",
      duration: "14 tuần",
      students: 312,
      rating: 4.7,
      progress: 25,
      lessons: 42,
      completedLessons: 10,
      instructor: "PGS. Hoàng Văn E",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "PERL System Administration",
      description: "Sử dụng PERL để quản trị hệ thống và tự động hóa tác vụ",
      language: "perl",
      level: "advanced",
      duration: "8 tuần",
      students: 67,
      rating: 4.4,
      progress: 0,
      lessons: 24,
      completedLessons: 0,
      instructor: "TS. Vũ Thị F",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === "all" || course.level === filterLevel
    const matchesLanguage = filterLanguage === "all" || course.language === filterLanguage

    return matchesSearch && matchesLevel && matchesLanguage
  })

  const getLevelBadge = (level: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    }
    const labels = {
      beginner: "Cơ bản",
      intermediate: "Trung cấp",
      advanced: "Nâng cao",
    }
    return { color: colors[level as keyof typeof colors], label: labels[level as keyof typeof labels] }
  }

  const getLanguageBadge = (language: string) => {
    return language === "python"
      ? { color: "bg-blue-100 text-blue-800", label: "Python" }
      : { color: "bg-purple-100 text-purple-800", label: "PERL" }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm khóa học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả ngôn ngữ</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="perl">PERL</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Cấp độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả cấp độ</SelectItem>
                    <SelectItem value="beginner">Cơ bản</SelectItem>
                    <SelectItem value="intermediate">Trung cấp</SelectItem>
                    <SelectItem value="advanced">Nâng cao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const levelBadge = getLevelBadge(course.level)
            const languageBadge = getLanguageBadge(course.language)

            return (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-blue-600" />
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={languageBadge.color}>{languageBadge.label}</Badge>
                        <Badge className={levelBadge.color}>{levelBadge.label}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm">{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} học viên</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Giảng viên:</span> {course.instructor}
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tiến độ</span>
                        <span>
                          {course.completedLessons}/{course.lessons} bài
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {course.progress > 0 ? (
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Tiếp tục học
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button className="w-full">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Bắt đầu học
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm">
                      Chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
            <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  )
}
