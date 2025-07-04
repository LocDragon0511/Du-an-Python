"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Play, CheckCircle, Clock, Users, Star, FileText, Video, Download, Lock, Award } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Navigation from "@/components/Navigation"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [userProgress, setUserProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    loadCourseData()
  }, [user, params.id])

  const loadCourseData = async () => {
    // Mock data - In real app, fetch from API
    const mockCourse = {
      id: Number.parseInt(params.id as string),
      title: "Python Fundamentals",
      description:
        "Học các khái niệm cơ bản của Python từ biến, hàm đến cấu trúc dữ liệu. Khóa học này sẽ giúp bạn nắm vững nền tảng lập trình Python.",
      language: "python",
      level: "beginner",
      duration: "8 tuần",
      students: 245,
      rating: 4.8,
      instructor: "TS. Nguyễn Văn A",
      thumbnail: "/placeholder.svg?height=300&width=500",
      objectives: [
        "Hiểu cú pháp cơ bản của Python",
        "Làm việc với biến và kiểu dữ liệu",
        "Sử dụng cấu trúc điều khiển",
        "Định nghĩa và sử dụng hàm",
        "Xử lý lỗi và exception",
        "Làm việc với file và module",
      ],
      requirements: [
        "Không cần kinh nghiệm lập trình trước đó",
        "Máy tính có thể cài đặt Python",
        "Tinh thần học hỏi và thực hành",
      ],
    }

    const mockLessons = [
      {
        id: 1,
        title: "Giới thiệu Python",
        description: "Tổng quan về ngôn ngữ Python, lịch sử phát triển và ứng dụng",
        duration: 45,
        type: "video",
        completed: true,
        locked: false,
        order: 1,
      },
      {
        id: 2,
        title: "Cài đặt môi trường Python",
        description: "Hướng dẫn cài đặt Python và IDE",
        duration: 30,
        type: "video",
        completed: true,
        locked: false,
        order: 2,
      },
      {
        id: 3,
        title: "Biến và kiểu dữ liệu",
        description: "Học cách khai báo biến và các kiểu dữ liệu cơ bản",
        duration: 60,
        type: "video",
        completed: true,
        locked: false,
        order: 3,
      },
      {
        id: 4,
        title: "Toán tử trong Python",
        description: "Các loại toán tử: số học, so sánh, logic",
        duration: 50,
        type: "video",
        completed: false,
        locked: false,
        order: 4,
      },
      {
        id: 5,
        title: "Cấu trúc điều khiển - If/Else",
        description: "Câu lệnh điều kiện và cách sử dụng",
        duration: 55,
        type: "video",
        completed: false,
        locked: false,
        order: 5,
      },
      {
        id: 6,
        title: "Vòng lặp For và While",
        description: "Các loại vòng lặp và ứng dụng thực tế",
        duration: 70,
        type: "video",
        completed: false,
        locked: false,
        order: 6,
      },
      {
        id: 7,
        title: "Hàm trong Python",
        description: "Định nghĩa, gọi hàm và tham số",
        duration: 80,
        type: "video",
        completed: false,
        locked: true,
        order: 7,
      },
      {
        id: 8,
        title: "List và Tuple",
        description: "Cấu trúc dữ liệu danh sách và bộ",
        duration: 65,
        type: "video",
        completed: false,
        locked: true,
        order: 8,
      },
    ]

    const mockAssignments = [
      {
        id: 1,
        title: "Bài tập 1: Hello World",
        description: "Viết chương trình Python đầu tiên",
        type: "code",
        dueDate: "2024-02-01",
        maxScore: 50,
        submitted: true,
        score: 45,
        status: "graded",
      },
      {
        id: 2,
        title: "Quiz: Biến và kiểu dữ liệu",
        description: "Kiểm tra hiểu biết về biến và kiểu dữ liệu",
        type: "quiz",
        dueDate: "2024-02-05",
        maxScore: 100,
        submitted: true,
        score: 85,
        status: "graded",
      },
      {
        id: 3,
        title: "Bài tập 2: Máy tính đơn giản",
        description: "Tạo máy tính thực hiện 4 phép toán cơ bản",
        type: "code",
        dueDate: "2024-02-10",
        maxScore: 150,
        submitted: false,
        score: null,
        status: "pending",
      },
    ]

    const mockProgress = {
      enrolledAt: "2024-01-15",
      progressPercentage: 60,
      completedLessons: 3,
      totalLessons: 8,
      averageScore: 85,
      totalScore: 130,
      maxScore: 300,
    }

    setCourse(mockCourse)
    setLessons(mockLessons)
    setAssignments(mockAssignments)
    setUserProgress(mockProgress)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải khóa học...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy khóa học</h2>
          <Link href="/courses">
            <Button>Quay lại danh sách khóa học</Button>
          </Link>
        </div>
      </div>
    )
  }

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

  const levelBadge = getLevelBadge(course.level)
  const languageBadge = getLanguageBadge(course.language)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Overview */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge className={languageBadge.color}>{languageBadge.label}</Badge>
                      <Badge className={levelBadge.color}>{levelBadge.label}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{course.duration}</div>
                    <div className="text-sm text-gray-600">Thời lượng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{course.students}</div>
                    <div className="text-sm text-gray-600">Học viên</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{lessons.length}</div>
                    <div className="text-sm text-gray-600">Bài giảng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{assignments.length}</div>
                    <div className="text-sm text-gray-600">Bài tập</div>
                  </div>
                </div>

                {userProgress && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Tiến độ của bạn</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Hoàn thành</span>
                      <span className="text-sm font-medium">{userProgress.progressPercentage}%</span>
                    </div>
                    <Progress value={userProgress.progressPercentage} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {userProgress.completedLessons}/{userProgress.totalLessons} bài giảng
                      </span>
                      <span>Điểm TB: {userProgress.averageScore}%</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Tabs defaultValue="lessons" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="lessons">Bài giảng</TabsTrigger>
                <TabsTrigger value="assignments">Bài tập</TabsTrigger>
                <TabsTrigger value="objectives">Mục tiêu</TabsTrigger>
                <TabsTrigger value="resources">Tài liệu</TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Danh sách bài giảng</CardTitle>
                    <CardDescription>
                      {userProgress?.completedLessons}/{lessons.length} bài giảng đã hoàn thành
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lessons.map((lesson, index) => (
                        <div
                          key={lesson.id}
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0">
                            {lesson.completed ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : lesson.locked ? (
                              <Lock className="h-6 w-6 text-gray-400" />
                            ) : (
                              <Play className="h-6 w-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">
                                {lesson.order}. {lesson.title}
                              </h4>
                              {lesson.type === "video" && <Video className="h-4 w-4 text-gray-400" />}
                            </div>
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{lesson.duration} phút</span>
                              </div>
                              {lesson.completed && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Đã hoàn thành
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {lesson.locked ? (
                              <Button variant="outline" disabled>
                                <Lock className="h-4 w-4 mr-2" />
                                Khóa
                              </Button>
                            ) : (
                              <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                                <Button variant={lesson.completed ? "outline" : "default"}>
                                  {lesson.completed ? "Xem lại" : "Học ngay"}
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bài tập và kiểm tra</CardTitle>
                    <CardDescription>Hoàn thành bài tập để củng cố kiến thức</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            {assignment.type === "code" ? (
                              <FileText className="h-6 w-6 text-blue-600" />
                            ) : (
                              <BookOpen className="h-6 w-6 text-purple-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{assignment.title}</h4>
                              <Badge variant={assignment.type === "code" ? "default" : "secondary"}>
                                {assignment.type === "code" ? "Lập trình" : "Trắc nghiệm"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{assignment.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>Hạn nộp: {assignment.dueDate}</span>
                              </div>
                              <div className="text-sm text-gray-500">Điểm tối đa: {assignment.maxScore}</div>
                              {assignment.submitted && (
                                <div className="flex items-center space-x-1">
                                  <Award className="h-4 w-4 text-yellow-500" />
                                  <span className="text-sm font-medium">
                                    {assignment.score}/{assignment.maxScore}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {assignment.submitted ? (
                              <Link href={`/courses/${course.id}/assignments/${assignment.id}`}>
                                <Button variant="outline">Xem bài làm</Button>
                              </Link>
                            ) : (
                              <Link href={`/courses/${course.id}/assignments/${assignment.id}`}>
                                <Button>Làm bài</Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="objectives" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mục tiêu khóa học</CardTitle>
                    <CardDescription>Sau khi hoàn thành khóa học, bạn sẽ có thể:</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {course.objectives.map((objective: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>

                    <Separator className="my-6" />

                    <h4 className="font-semibold mb-3">Yêu cầu trước khi học</h4>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tài liệu tham khảo</CardTitle>
                    <CardDescription>Các tài liệu bổ sung để hỗ trợ học tập</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 border rounded-lg">
                        <FileText className="h-8 w-8 text-red-600" />
                        <div className="flex-1">
                          <h4 className="font-medium">Python Handbook.pdf</h4>
                          <p className="text-sm text-gray-600">Tài liệu tham khảo cú pháp Python</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Tải về
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4 p-4 border rounded-lg">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-medium">Bài tập thực hành.zip</h4>
                          <p className="text-sm text-gray-600">Các bài tập mẫu và lời giải</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Tải về
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Video className="h-8 w-8 text-green-600" />
                        <div className="flex-1">
                          <h4 className="font-medium">Video bổ sung</h4>
                          <p className="text-sm text-gray-600">Playlist YouTube về Python cơ bản</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Xem ngay
                        </Button>
                      </div>
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
                    <Play className="h-4 w-4 mr-2" />
                    Thực hành code
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Hỏi AI
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Diễn đàn thảo luận
                </Button>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            {userProgress && (
              <Card>
                <CardHeader>
                  <CardTitle>Tóm tắt tiến độ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Bài giảng hoàn thành</span>
                    <span className="font-medium">
                      {userProgress.completedLessons}/{userProgress.totalLessons}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Điểm trung bình</span>
                    <span className="font-medium">{userProgress.averageScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tổng điểm</span>
                    <span className="font-medium">
                      {userProgress.totalScore}/{userProgress.maxScore}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ngày đăng ký</span>
                    <span className="font-medium">{userProgress.enrolledAt}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Đánh giá khóa học</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">{course.rating}</div>
                  <div className="flex justify-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(course.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{course.students} đánh giá</p>
                </div>
                <Button className="w-full" variant="outline">
                  Viết đánh giá
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
