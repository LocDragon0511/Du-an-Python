import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email và mật khẩu là bắt buộc" }, { status: 400 })
    }

    const result = await authenticateUser(email, password)

    if (result.success) {
      return NextResponse.json(result, { status: 200 })
    } else {
      return NextResponse.json(result, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
