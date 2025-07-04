"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, MessageSquare, Calendar, CheckCircle, Clock, Award, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import Navigation from "@/components/Navigation"

export default function DashboardPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const studentStats = {
    coursesEnrolled: 3,
    assignmentsCompleted: 12,
    totalAssignments: 18,
    averageScore: 85,
    studyStreak: 7,
  }

  const recentActivities = [
    { id: 1, type: "assignment", title: "Python Loops Assignment", status: "completed", date: "2024-01-15" },
    { id: 2, type: "lesson", title: "PERL Regular Expressions", status: "in-progress", date: "2024-01-14" },
    { id: 3, type: "quiz", title: "Python Functions Quiz", status: "completed", date: "2024-01-13" },
  ]

  const upcomingDeadlines = [
    { id: 1, title: "PERL File Handling Project", dueDate: "2024-01-20", course: "PERL Advanced" },
    { id: 2, title: "Python OOP Assignment", dueDate: "2024-01-22", course: "Python Fundamentals" },
  ]

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại, {user.full_name}! 👋</h2>
          <p className="text-gray-600">
            {user.role === "student" && "Hôm nay là ngày tuyệt vời để học PERL & Python"}
            {user.role === "teacher" && "Quản lý khóa học và theo dõi tiến độ sinh viên"}
            {user.role === "admin" && "Quản trị hệ thống và theo dõi hoạt động"}
          </p>
          {user.student_id && <p className="text-sm text-gray-500">Mã sinh viên: {user.student_id}</p>}
        </div>

        {/* Stats Cards - Show different stats based on role */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === "student" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Khóa học</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentStats.coursesEnrolled}</div>
                  <p className="text-xs text-muted-foreground">Đang theo học</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bài tập</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {studentStats.assignmentsCompleted}/{studentStats.totalAssignments}
                  </div>
                  <p className="text-xs text-muted-foreground">Hoàn thành</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Điểm TB</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentStats.averageScore}%</div>
                  <p className="text-xs text-muted-foreground">Tất cả bài tập</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentStats.studyStreak} ngày</div>
                  <p className="text-xs text-muted-foreground">Học liên tục</p>
                </CardContent>
              </Card>
            </>
          )}

          {user.role === "teacher" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Khóa học</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Đang giảng dạy</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sinh viên</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-muted-foreground">Tổng số học viên</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bài tập</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Cần chấm điểm</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đánh giá</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Điểm trung bình</p>
                </CardContent>
              </Card>
            </>
          )}

          {user.role === "admin" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Người dùng</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">Tổng số</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Khóa học</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Đang hoạt động</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hoạt động</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">892</div>
                  <p className="text-xs text-muted-foreground">Người dùng hoạt động</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.8%</div>
                  <p className="text-xs text-muted-foreground">Hệ thống</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="progress" className="space-y-4">
              <TabsList>
                <TabsTrigger value="progress">{user.role === "student" ? "Tiến độ học tập" : "Tổng quan"}</TabsTrigger>
                <TabsTrigger value="activities">Hoạt động gần đây</TabsTrigger>
              </TabsList>

              <TabsContent value="progress" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{user.role === "student" ? "Tiến độ khóa học" : "Thống kê hệ thống"}</CardTitle>
                    <CardDescription>
                      {user.role === "student" ? "Theo dõi tiến độ học tập của bạn" : "Tổng quan hoạt động hệ thống"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {user.role === "student" && (
                      <>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Python Fundamentals</span>
                            <span className="text-sm text-gray-500">75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">PERL Advanced</span>
                            <span className="text-sm text-gray-500">60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Web Development</span>
                            <span className="text-sm text-gray-500">40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                      </>
                    )}

                    {user.role !== "student" && (
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Tỷ lệ hoàn thành bài tập</span>
                          <span className="font-semibold">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Điểm trung bình</span>
                          <span className="font-semibold">7.2/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Thời gian học trung bình</span>
                          <span className="font-semibold">2.5h/tuần</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Hoạt động gần đây</CardTitle>
                    <CardDescription>Các hoạt động trong tuần qua</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className="flex-shrink-0">
                            {activity.type === "assignment" && <Code className="h-5 w-5 text-blue-600" />}
                            {activity.type === "lesson" && <BookOpen className="h-5 w-5 text-green-600" />}
                            {activity.type === "quiz" && <CheckCircle className="h-5 w-5 text-purple-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.date}</p>
                          </div>
                          <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                            {activity.status === "completed" ? "Hoàn thành" : "Đang làm"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/practice">
                  <Button className="w-full justify-start" variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    Thực hành code
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Xem khóa học
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat với AI
                  </Button>
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button className="w-full justify-start" variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      Quản trị
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines - Only for students */}
            {user.role === "student" && (
              <Card>
                <CardHeader>
                  <CardTitle>Deadline sắp tới</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline) => (
                      <div key={deadline.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">{deadline.title}</p>
                            <p className="text-xs text-gray-500">{deadline.course}</p>
                          </div>
                          <Clock className="h-4 w-4 text-orange-500" />
                        </div>
                        <p className="text-xs text-orange-600 mt-2">Hạn nộp: {deadline.dueDate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
