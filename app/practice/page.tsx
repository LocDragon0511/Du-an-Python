"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Save, RotateCcw, Code, Terminal, FileText, Lightbulb } from "lucide-react"
import Navigation from "@/components/Navigation"

export default function PracticePage() {
  const [language, setLanguage] = useState("python")
  const [code, setCode] = useState(`# Chào mừng đến với IDE trực tuyến!
# Hãy viết code Python hoặc Perl của bạn ở đây

print("Hello, World!")`)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const examples = {
    python: [
      {
        title: "Hello World",
        code: `print("Hello, World!")`,
      },
      {
        title: "Vòng lặp For",
        code: `for i in range(5):
    print(f"Số {i}")`,
      },
      {
        title: "Hàm đơn giản",
        code: `def greet(name):
    return f"Xin chào, {name}!"

print(greet("Python"))`,
      },
    ],
    perl: [
      {
        title: "Hello World",
        code: `print "Hello, World!\\n";`,
      },
      {
        title: "Vòng lặp For",
        code: `for my $i (0..4) {
    print "Số $i\\n";
}`,
      },
      {
        title: "Subroutine",
        code: `sub greet {
    my $name = shift;
    return "Xin chào, $name!";
}

print greet("Perl") . "\\n";`,
      },
    ],
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Đang chạy code...")

    // Simulate code execution
    setTimeout(() => {
      if (language === "python") {
        if (code.includes("print")) {
          setOutput("Hello, World!\n> Code executed successfully!")
        } else {
          setOutput("> Code executed successfully!")
        }
      } else {
        setOutput("Hello, World!\n> Perl code executed successfully!")
      }
      setIsRunning(false)
    }, 2000)
  }

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode)
  }

  const resetCode = () => {
    setCode(
      language === "python"
        ? `# Chào mừng đến với IDE trực tuyến!\n# Hãy viết code Python của bạn ở đây\n\nprint("Hello, World!")`
        : `# Chào mừng đến với IDE trực tuyến!\n# Hãy viết code Perl của bạn ở đây\n\nprint "Hello, World!\\n";`,
    )
    setOutput("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Examples Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Ví dụ mẫu
                </CardTitle>
                <CardDescription>Chọn ví dụ để bắt đầu nhanh</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {examples[language as keyof typeof examples].map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left"
                    onClick={() => loadExample(example.code)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {example.title}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">💡 Mẹo sử dụng</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Nhấn Ctrl+Enter để chạy code nhanh</p>
                <p>• Sử dụng print() để xem kết quả</p>
                <p>• Code sẽ được lưu tự động</p>
                <p>• Kiểm tra cú pháp trước khi chạy</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <div className="grid grid-rows-2 gap-4 h-[800px]">
              {/* Code Editor */}
              <Card className="row-span-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      Code Editor
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={resetCode}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Lưu
                      </Button>
                      <Button onClick={runCode} disabled={isRunning} className="bg-green-600 text-white">
                        <Play className="h-4 w-4 mr-2" />
                        {isRunning ? "Đang chạy..." : "Chạy"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-full">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="h-full font-mono text-sm resize-none"
                    placeholder={`Viết code ${language.toUpperCase()} của bạn ở đây...`}
                  />
                </CardContent>
              </Card>

              {/* Output Panel */}
              <Card className="row-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Terminal className="h-5 w-5 mr-2" />
                    Kết quả
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="output" className="h-full">
                    <TabsList>
                      <TabsTrigger value="output">Output</TabsTrigger>
                      <TabsTrigger value="errors">Errors</TabsTrigger>
                      <TabsTrigger value="help">Help</TabsTrigger>
                    </TabsList>

                    <TabsContent value="output" className="mt-4">
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-auto">
                        {output || "Nhấn 'Chạy' để xem kết quả..."}
                      </div>
                    </TabsContent>

                    <TabsContent value="errors" className="mt-4">
                      <div className="bg-gray-900 text-red-400 p-4 rounded-lg font-mono text-sm h-64 overflow-auto">
                        {isRunning ? "Đang kiểm tra lỗi..." : "Không có lỗi"}
                      </div>
                    </TabsContent>

                    <TabsContent value="help" className="mt-4">
                      <div className="bg-blue-50 p-4 rounded-lg h-64 overflow-auto">
                        <h4 className="font-semibold mb-2">Hướng dẫn sử dụng:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Chọn ngôn ngữ Python hoặc Perl</li>
                          <li>• Viết code trong khung editor</li>
                          <li>• Nhấn "Chạy" để thực thi</li>
                          <li>• Xem kết quả trong tab Output</li>
                          <li>• Kiểm tra lỗi trong tab Errors</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
