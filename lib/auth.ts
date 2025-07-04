export interface User {
  id: number
  email: string
  full_name: string
  role: "student" | "teacher" | "admin"
  student_id?: string
  avatar_url?: string
  status: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  message?: string
  token?: string
}

// Mock database - In real app, this would connect to your actual database
const mockUsers = [
  {
    id: 1,
    email: "admin@dtu.edu.vn",
    password: "admin123",
    full_name: "Quản trị viên",
    role: "admin" as const,
    status: "active",
  },
  {
    id: 2,
    email: "teacher@dtu.edu.vn",
    password: "teacher123",
    full_name: "TS. Nguyễn Văn A",
    role: "teacher" as const,
    status: "active",
  },
  {
    id: 3,
    email: "student@dtu.edu.vn",
    password: "student123",
    full_name: "Nguyễn Văn Nam",
    role: "student" as const,
    student_id: "102200001",
    status: "active",
  },
]

export async function authenticateUser(email: string, password: string): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return {
      success: false,
      message: "Email hoặc mật khẩu không đúng",
    }
  }

  if (user.status !== "active") {
    return {
      success: false,
      message: "Tài khoản đã bị khóa",
    }
  }

  const { password: _, ...userWithoutPassword } = user

  return {
    success: true,
    user: userWithoutPassword,
    token: `mock_token_${user.id}`,
    message: "Đăng nhập thành công",
  }
}

export async function registerUser(userData: {
  email: string
  password: string
  full_name: string
  role: string
  student_id?: string
}): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === userData.email)
  if (existingUser) {
    return {
      success: false,
      message: "Email đã được sử dụng",
    }
  }

  // Create new user
  const newUser = {
    id: mockUsers.length + 1,
    email: userData.email,
    password: userData.password,
    full_name: userData.full_name,
    role: userData.role as "student" | "teacher" | "admin",
    student_id: userData.student_id,
    status: "active",
  }

  mockUsers.push(newUser)

  const { password: _, ...userWithoutPassword } = newUser

  return {
    success: true,
    user: userWithoutPassword,
    token: `mock_token_${newUser.id}`,
    message: "Đăng ký thành công",
  }
}

export function generateToken(userId: number): string {
  return `mock_token_${userId}_${Date.now()}`
}

export function verifyToken(token: string): { valid: boolean; userId?: number } {
  if (token.startsWith("mock_token_")) {
    const userId = Number.parseInt(token.split("_")[2])
    return { valid: true, userId }
  }
  return { valid: false }
}
