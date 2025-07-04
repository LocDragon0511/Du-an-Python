"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Play, Pause, CheckCircle, FileText, MessageSquare, Code } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Navigation from "@/components/Navigation"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [lesson, setLesson] = useState<any>(null)
  const [course, setCourse] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [notes, setNotes] = useState("")
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    loadLessonData()
  }, [user, params.id, params.lessonId])

  const loadLessonData = async () => {
    // Mock data - In real app, fetch from API
    const mockLesson = {
      id: Number.parseInt(params.lessonId as string),
      title: "Biến và kiểu dữ liệu",
      description: "Học cách khai báo biến và các kiểu dữ liệu cơ bản trong Python",
      content: `
# Biến và Kiểu Dữ Liệu trong Python

## 1. Giới thiệu về biến

Biến trong Python là một tên được sử dụng để tham chiếu đến một giá trị được lưu trữ trong bộ nhớ. Python là ngôn ngữ có kiểu dữ liệu động, nghĩa là bạn không cần khai báo kiểu dữ liệu của biến trước khi sử dụng.

## 2. Cách khai báo biến

\`\`\`python
# Khai báo biến số nguyên
age = 25

# Khai báo biến chuỗi
name = "Nguyễn Văn A"

# Khai báo biến số thực
height = 1.75

# Khai báo biến boolean
is_student = True
\`\`\`

## 3. Các kiểu dữ liệu cơ bản

### 3.1 Số nguyên (int)
\`\`\`python
x = 10
y = -5
z = 0
\`\`\`

### 3.2 Số thực (float)
\`\`\`python
pi = 3.14159
temperature = -10.5
\`\`\`

### 3.3 Chuỗi (string)
\`\`\`python
greeting = "Xin chào"
message = 'Python rất thú vị!'
\`\`\`

### 3.4 Boolean
\`\`\`python
is_true = True
is_false = False
\`\`\`

## 4. Kiểm tra kiểu dữ liệu

\`\`\`python
print(type(age))        # <class 'int'>
print(type(name))       # <class 'str'>
print(type(height))     # <class 'float'>
print(type(is_student)) # <class 'bool'>
\`\`\`

## 5. Chuyển đổi kiểu dữ liệu

\`\`\`python
# Chuyển đổi sang số nguyên
num_str = "123"
num_int = int(num_str)

# Chuyển đổi sang số thực
num_float = float(num_str)

# Chuyển đổi sang chuỗi
age_str = str(age)
\`\`\`

## 6. Bài tập thực hành

1. Khai báo các biến lưu trữ thông tin cá nhân của bạn
2. Thực hiện các phép chuyển đổi kiểu dữ liệu
3. In ra màn hình thông tin với định dạng đẹp
      `,
      duration: 60,
      videoUrl: "/placeholder-video.mp4",
      order: 3,
      completed: false,
      nextLesson: 4,
      prevLesson: 2,
    }

    const mockCourse = {
      id: Number.parseInt(params.id as string),
      title: "Python Fundamentals",
      totalLessons: 8,
    }

    setLesson(mockLesson)
    setCourse(mockCourse)
    setCompleted(mockLesson.completed)
    setLoading(false)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In real app, control video player
  }

  const handleMarkComplete = () => {
    setCompleted(true)
    // In real app, send API request to mark lesson as completed
  }

  const handleSaveNotes = () => {
    // In real app, save notes to database
    console.log("Saving notes:", notes)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài giảng...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <div className="mb-4">
                      <Play className="h-16 w-16 mx-auto opacity-80" />
                    </div>
                    <p className="text-lg">Video: {lesson.title}</p>
                    <p className="text-sm opacity-80">Thời lượng: {lesson.duration} phút</p>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-4">
                      <Button variant="secondary" size="sm" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1">
                        <Progress value={progress} className="h-2" />
                      </div>
                      <span className="text-white text-sm">
                        {Math.floor((progress * lesson.duration) / 100)}:
                        {String(Math.floor((((progress * lesson.duration) / 100) % 1) * 60)).padStart(2, "0")} /{" "}
                        {lesson.duration}:00
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <Tabs defaultValue="content" className="space-y-4">
              <TabsList>
                <TabsTrigger value="content">Nội dung bài học</TabsTrigger>
                <TabsTrigger value="practice">Thực hành</TabsTrigger>
                <TabsTrigger value="discussion">Thảo luận</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Nội dung chi tiết</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
                        {lesson.content}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="practice" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thực hành ngay</CardTitle>
                    <CardDescription>Áp dụng kiến thức vừa học vào thực tế</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Bài tập 1: Khai báo biến</h4>
                        <p className="text-sm text-gray-700 mb-3">
                          Khai báo các biến lưu trữ thông tin cá nhân của bạn (tên, tuổi, chiều cao, trạng thái sinh
                          viên)
                        </p>
                        <Link href="/practice">
                          <Button size="sm">
                            <Code className="h-4 w-4 mr-2" />
                            Mở IDE
                          </Button>
                        </Link>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Bài tập 2: Chuyển đổi kiểu dữ liệu</h4>
                        <p className="text-sm text-gray-700 mb-3">
                          Viết chương trình nhập vào một số dưới dạng chuỗi và chuyển đổi sang các kiểu khác
                        </p>
                        <Link href="/practice">
                          <Button size="sm">
                            <Code className="h-4 w-4 mr-2" />
                            Thực hành
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thảo luận</CardTitle>
                    <CardDescription>Đặt câu hỏi và thảo luận với cộng đồng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            A
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">Nguyễn Văn A</span>
                              <span className="text-sm text-gray-500">2 giờ trước</span>
                            </div>
                            <p className="text-sm text-gray-700">
                              Cho em hỏi sự khác biệt giữa int và float trong Python là gì ạ?
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Trả lời
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            T
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">TS. Nguyễn Văn A</span>
                              <Badge variant="outline" className="text-xs">
                                Giảng viên
                              </Badge>
                              <span className="text-sm text-gray-500">1 giờ trước</span>
                            </div>
                            <p className="text-sm text-gray-700">
                              int là số nguyên (1, 2, 3...), float là số thực có phần thập phân (1.5, 2.7...). Python tự
                              động chọn kiểu phù hợp khi bạn gán giá trị.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <Textarea placeholder="Đặt câu hỏi hoặc chia sẻ ý kiến..." className="mb-3" />
                        <Button>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Gửi câu hỏi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {lesson.prevLesson ? (
                <Link href={`/courses/${params.id}/lessons/${lesson.prevLesson}`}>
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Bài trước
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}

              {lesson.nextLesson ? (
                <Link href={`/courses/${params.id}/lessons/${lesson.nextLesson}`}>
                  <Button>
                    Bài tiếp theo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link href={`/courses/${params.id}`}>
                  <Button>
                    Hoàn thành khóa học
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Ghi chú cá nhân</CardTitle>
                <CardDescription>Ghi lại những điểm quan trọng</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Viết ghi chú của bạn..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[120px] mb-3"
                />
                <Button onClick={handleSaveNotes} size="sm" className="w-full">
                  Lưu ghi chú
                </Button>
              </CardContent>
            </Card>

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
                <Link href="/chat">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Hỏi AI
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Tải tài liệu
                </Button>
              </CardContent>
            </Card>

            {/* Lesson Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Tiến độ bài học</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Đã xem</span>
                    <span>{Math.floor(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Thời gian: {Math.floor((progress * lesson.duration) / 100)} phút</span>
                    <span>Còn lại: {lesson.duration - Math.floor((progress * lesson.duration) / 100)} phút</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
