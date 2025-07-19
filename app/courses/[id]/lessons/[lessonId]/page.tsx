"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(true)

  const lessonVideos: Record<number, string> = {
    1: "/videos/lesson-1.mp4",
    2: "/videos/lesson-2.mp4",
    3: "/videos/lesson-1.mp4",
    4: "/videos/lesson-1.mp4",
    5: "/videos/lesson-1.mp4",
    6: "/videos/lesson-6.mp4",
    7: "/videos/lesson-7.mp4",
    8: "/videos/lesson-8.mp4",
  }

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    loadLessonData()
  }, [user, params.id, params.lessonId])

  const loadLessonData = () => {
    const id = Number(params.lessonId)
    const mockLesson = {
      id,
      title: `Bài học ${id}`,
      description: `Nội dung của bài học ${id}`,
      content: `# Nội dung bài học ${id}…`,
      duration: 60,
      videoUrl: lessonVideos[id] || "/videos/default.mp4",
      order: id,
      completed: false,
      nextLesson: id < 8 ? id + 1 : null,
      prevLesson: id > 1 ? id - 1 : null,
    }

    const mockCourse = {
      id: Number(params.id),
      title: "Python Fundamentals",
      totalLessons: 8,
    }

    setLesson(mockLesson)
    setCourse(mockCourse)
    setLoading(false)
  }

  const handleSaveNotes = () => {
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
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                  <video
                    src={lesson.videoUrl}
                    controls
                    autoPlay={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="content" className="space-y-4">
              <TabsList>
                <TabsTrigger value="content">Nội dung</TabsTrigger>
                <TabsTrigger value="practice">Thực hành</TabsTrigger>
                <TabsTrigger value="discussion">Thảo luận</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <Card>
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
                        <h4 className="font-semibold mb-2">Bài tập: Khai báo biến</h4>
                        <p className="text-sm text-gray-700 mb-3">
                          Khai báo các biến lưu trữ thông tin cá nhân của bạn (tên, tuổi…)
                        </p>
                        <Link href="/practice">
                          <Button size="sm">
                            <Code className="h-4 w-4 mr-2" />
                            Mở IDE
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
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="Đặt câu hỏi hoặc chia sẻ ý kiến..." className="mb-3" />
                    <Button>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Gửi câu hỏi
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

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

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ghi chú cá nhân</CardTitle>
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
          </div>
        </div>
      </div>
    </div>
  )
}
