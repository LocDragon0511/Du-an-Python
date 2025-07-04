"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, FileText, Code, Send, Save, CheckCircle, AlertCircle, Play } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Navigation from "@/components/Navigation"

export default function AssignmentPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [assignment, setAssignment] = useState<any>(null)
  const [course, setCourse] = useState<any>(null)
  const [submission, setSubmission] = useState<any>(null)
  const [code, setCode] = useState("")
  const [answers, setAnswers] = useState<any>({})
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    loadAssignmentData()
  }, [user, params.id, params.assignmentId])

  useEffect(() => {
    if (timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const loadAssignmentData = async () => {
    // Mock data - In real app, fetch from API
    const assignmentId = Number.parseInt(params.assignmentId as string)

    let mockAssignment
    if (assignmentId === 1) {
      mockAssignment = {
        id: 1,
        title: "Bài tập 1: Hello World",
        description: "Viết chương trình Python đầu tiên của bạn",
        type: "code",
        instructions: `
## Yêu cầu bài tập

Viết một chương trình Python thực hiện các yêu cầu sau:

1. **In ra màn hình**: "Hello, World!"
2. **Khai báo biến**: Tạo biến lưu trữ tên của bạn
3. **In thông tin cá nhân**: In ra "Xin chào, [tên của bạn]!"
4. **Tính toán đơn giản**: Tính và in ra tổng của 2 số bất kỳ

### Ví dụ output mong muốn:
\`\`\`
Hello, World!
Xin chào, Nguyễn Văn A!
Tổng của 5 và 3 là: 8
\`\`\`

### Gợi ý:
- Sử dụng hàm \`print()\` để in ra màn hình
- Sử dụng f-string để format chuỗi: \`f"Xin chào, {name}!"\`
- Khai báo biến: \`name = "Tên của bạn"\`
        `,
        starterCode: `# Bài tập 1: Hello World
# Họ tên: [Điền tên của bạn]
# Mã sinh viên: [Điền mã sinh viên]

# TODO: Viết code của bạn ở đây

`,
        maxScore: 50,
        dueDate: "2024-02-01T23:59:59",
        timeLimit: null,
        testCases: [
          {
            input: "",
            expectedOutput: "Hello, World!",
            description: "In ra Hello World",
          },
        ],
      }
    } else if (assignmentId === 2) {
      mockAssignment = {
        id: 2,
        title: "Quiz: Biến và kiểu dữ liệu",
        description: "Kiểm tra hiểu biết về biến và kiểu dữ liệu trong Python",
        type: "quiz",
        instructions: "Trả lời các câu hỏi sau đây. Bạn có 30 phút để hoàn thành.",
        maxScore: 100,
        dueDate: "2024-02-05T23:59:59",
        timeLimit: 30 * 60, // 30 minutes in seconds
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question: "Cú pháp nào sau đây đúng để khai báo biến trong Python?",
            options: ["int x = 5", "x = 5", "var x = 5", "declare x = 5"],
            correctAnswer: "x = 5",
            points: 20,
          },
          {
            id: 2,
            type: "multiple_choice",
            question: "Kiểu dữ liệu nào được sử dụng để lưu trữ số thực trong Python?",
            options: ["int", "float", "double", "real"],
            correctAnswer: "float",
            points: 20,
          },
          {
            id: 3,
            type: "true_false",
            question: "Python có phân biệt chữ hoa và chữ thường trong tên biến.",
            options: ["True", "False"],
            correctAnswer: "True",
            points: 15,
          },
          {
            id: 4,
            type: "multiple_select",
            question: "Những kiểu dữ liệu nào sau đây là kiểu dữ liệu cơ bản trong Python?",
            options: ["int", "float", "string", "boolean", "array"],
            correctAnswers: ["int", "float", "string", "boolean"],
            points: 25,
          },
          {
            id: 5,
            type: "short_answer",
            question: "Hàm nào được sử dụng để kiểm tra kiểu dữ liệu của một biến trong Python?",
            correctAnswer: "type()",
            points: 20,
          },
        ],
      }
    } else {
      mockAssignment = {
        id: 3,
        title: "Bài tập 2: Máy tính đơn giản",
        description: "Tạo máy tính thực hiện 4 phép toán cơ bản",
        type: "code",
        instructions: `
## Yêu cầu bài tập

Viết chương trình máy tính đơn giản thực hiện các yêu cầu sau:

1. **Nhập dữ liệu**: Cho phép người dùng nhập 2 số và phép toán (+, -, *, /)
2. **Tính toán**: Thực hiện phép toán tương ứng
3. **Xử lý lỗi**: Kiểm tra chia cho 0 và phép toán không hợp lệ
4. **Hiển thị kết quả**: In ra kết quả với format đẹp

### Ví dụ chạy chương trình:
\`\`\`
=== MÁY TÍNH ĐƠN GIẢN ===
Nhập số thứ nhất: 10
Nhập phép toán (+, -, *, /): +
Nhập số thứ hai: 5
Kết quả: 10 + 5 = 15
\`\`\`

### Yêu cầu kỹ thuật:
- Sử dụng hàm \`input()\` để nhập dữ liệu
- Sử dụng \`try-except\` để xử lý lỗi
- Sử dụng \`if-elif-else\` để xử lý các phép toán
        `,
        starterCode: `# Bài tập 2: Máy tính đơn giản
# Họ tên: [Điền tên của bạn]
# Mã sinh viên: [Điền mã sinh viên]

def calculator():
    """
    Hàm thực hiện máy tính đơn giản
    """
    print("=== MÁY TÍNH ĐƠN GIẢN ===")
    
    # TODO: Viết code của bạn ở đây
    
    pass

# Gọi hàm calculator
calculator()
`,
        maxScore: 150,
        dueDate: "2024-02-10T23:59:59",
        timeLimit: null,
      }
    }

    const mockCourse = {
      id: Number.parseInt(params.id as string),
      title: "Python Fundamentals",
    }

    const mockSubmission = {
      id: 1,
      submitted: false,
      submittedAt: null,
      score: null,
      feedback: null,
      status: "draft",
    }

    setAssignment(mockAssignment)
    setCourse(mockCourse)
    setSubmission(mockSubmission)
    setCode(mockAssignment.starterCode || "")

    // Set timer for quiz
    if (mockAssignment.type === "quiz" && mockAssignment.timeLimit) {
      setTimeLeft(mockAssignment.timeLimit)
    }

    setLoading(false)
  }

  const handleSaveDraft = () => {
    // Save current progress as draft
    console.log("Saving draft...")
  }

  const handleSubmit = () => {
    // Submit assignment
    console.log("Submitting assignment...")
    setSubmission({
      ...submission,
      submitted: true,
      submittedAt: new Date().toISOString(),
      status: "submitted",
    })
  }

  const handleRunCode = () => {
    // Run code in practice environment
    console.log("Running code:", code)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    }
    return `${minutes}:${String(secs).padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài tập...</p>
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
            {/* Assignment Instructions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Hướng dẫn bài tập</CardTitle>
                <CardDescription>{assignment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-sm">{assignment.instructions}</div>
                </div>
              </CardContent>
            </Card>

            {/* Assignment Content */}
            {assignment.type === "code" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Code Editor</CardTitle>
                  <CardDescription>Viết code của bạn ở đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="font-mono text-sm min-h-[400px]"
                      placeholder="Viết code Python của bạn..."
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleRunCode} variant="outline">
                        <Play className="h-4 w-4 mr-2" />
                        Chạy thử
                      </Button>
                      <Button onClick={handleSaveDraft} variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Lưu nháp
                      </Button>
                      {!submission.submitted && (
                        <Button onClick={handleSubmit}>
                          <Send className="h-4 w-4 mr-2" />
                          Nộp bài
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Câu hỏi trắc nghiệm</CardTitle>
                  <CardDescription>Trả lời {assignment.questions?.length} câu hỏi sau đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {assignment.questions?.map((question: any, index: number) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium">
                            Câu {index + 1}: {question.question}
                          </h4>
                          <Badge variant="outline">{question.points} điểm</Badge>
                        </div>

                        {question.type === "multiple_choice" && (
                          <RadioGroup
                            value={answers[question.id]}
                            onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
                          >
                            {question.options.map((option: string, optIndex: number) => (
                              <div key={optIndex} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`q${question.id}_${optIndex}`} />
                                <Label htmlFor={`q${question.id}_${optIndex}`}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}

                        {question.type === "true_false" && (
                          <RadioGroup
                            value={answers[question.id]}
                            onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="True" id={`q${question.id}_true`} />
                              <Label htmlFor={`q${question.id}_true`}>Đúng</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="False" id={`q${question.id}_false`} />
                              <Label htmlFor={`q${question.id}_false`}>Sai</Label>
                            </div>
                          </RadioGroup>
                        )}

                        {question.type === "multiple_select" && (
                          <div className="space-y-2">
                            {question.options.map((option: string, optIndex: number) => (
                              <div key={optIndex} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`q${question.id}_${optIndex}`}
                                  checked={answers[question.id]?.includes(option) || false}
                                  onCheckedChange={(checked) => {
                                    const currentAnswers = answers[question.id] || []
                                    if (checked) {
                                      setAnswers({
                                        ...answers,
                                        [question.id]: [...currentAnswers, option],
                                      })
                                    } else {
                                      setAnswers({
                                        ...answers,
                                        [question.id]: currentAnswers.filter((a: string) => a !== option),
                                      })
                                    }
                                  }}
                                />
                                <Label htmlFor={`q${question.id}_${optIndex}`}>{option}</Label>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "short_answer" && (
                          <Input
                            value={answers[question.id] || ""}
                            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                            placeholder="Nhập câu trả lời..."
                          />
                        )}
                      </div>
                    ))}

                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleSaveDraft} variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Lưu nháp
                      </Button>
                      {!submission.submitted && (
                        <Button onClick={handleSubmit}>
                          <Send className="h-4 w-4 mr-2" />
                          Nộp bài
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submission Status */}
            {submission.submitted && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Đã nộp bài
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Thời gian nộp:</span>
                      <span className="font-medium">{new Date(submission.submittedAt).toLocaleString("vi-VN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trạng thái:</span>
                      <Badge variant={submission.status === "graded" ? "default" : "secondary"}>
                        {submission.status === "graded" ? "Đã chấm điểm" : "Đang chờ chấm"}
                      </Badge>
                    </div>
                    {submission.score !== null && (
                      <div className="flex justify-between">
                        <span>Điểm số:</span>
                        <span className="font-bold text-lg">
                          {submission.score}/{assignment.maxScore}
                        </span>
                      </div>
                    )}
                    {submission.feedback && (
                      <div>
                        <span className="font-medium">Nhận xét:</span>
                        <p className="text-sm text-gray-700 mt-1">{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin bài tập</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Loại bài tập:</span>
                  <Badge variant={assignment.type === "code" ? "default" : "secondary"}>
                    {assignment.type === "code" ? "Lập trình" : "Trắc nghiệm"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Điểm tối đa:</span>
                  <span className="font-medium">{assignment.maxScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Hạn nộp:</span>
                  <span className="font-medium">{new Date(assignment.dueDate).toLocaleString("vi-VN")}</span>
                </div>
                {assignment.timeLimit && (
                  <div className="flex justify-between">
                    <span className="text-sm">Thời gian làm bài:</span>
                    <span className="font-medium">{assignment.timeLimit / 60} phút</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm">Trạng thái:</span>
                  <Badge variant={submission.submitted ? "default" : "secondary"}>
                    {submission.submitted ? "Đã nộp" : "Chưa nộp"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Timer */}
            {timeLeft !== null && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Thời gian còn lại
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold font-mono ${timeLeft < 300 ? "text-red-600" : "text-blue-600"}`}
                    >
                      {formatTime(timeLeft)}
                    </div>
                    {timeLeft < 300 && (
                      <div className="flex items-center justify-center mt-2 text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Sắp hết thời gian!</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assignment.type === "code" && (
                  <Link href="/practice">
                    <Button className="w-full justify-start" variant="outline">
                      <Code className="h-4 w-4 mr-2" />
                      Mở IDE riêng
                    </Button>
                  </Link>
                )}
                <Link href="/chat">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Hỏi AI
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu tiến độ
                </Button>
              </CardContent>
            </Card>

            {/* Test Cases (for code assignments) */}
            {assignment.type === "code" && assignment.testCases && (
              <Card>
                <CardHeader>
                  <CardTitle>Test Cases</CardTitle>
                  <CardDescription>Các trường hợp kiểm tra</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assignment.testCases.map((testCase: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="text-sm font-medium mb-2">
                          Test {index + 1}: {testCase.description}
                        </div>
                        {testCase.input && (
                          <div className="text-xs text-gray-600 mb-1">
                            Input: <code className="bg-gray-100 px-1 rounded">{testCase.input}</code>
                          </div>
                        )}
                        <div className="text-xs text-gray-600">
                          Expected: <code className="bg-gray-100 px-1 rounded">{testCase.expectedOutput}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Grading Rubric */}
            <Card>
              <CardHeader>
                <CardTitle>Tiêu chí chấm điểm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {assignment.type === "code" ? (
                    <>
                      <div className="flex justify-between">
                        <span>Code chạy đúng:</span>
                        <span>60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Logic và thuật toán:</span>
                        <span>25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Code style và comment:</span>
                        <span>15%</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Câu trả lời đúng:</span>
                        <span>100%</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        Mỗi câu có điểm riêng, tổng điểm được tính tự động
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
