// Database configuration và connection
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

// Sử dụng environment variable hoặc fallback
const connectionString =
  process.env.DATABASE_URL || "postgresql://username:password@localhost:5432/perl_python_learning"

// Tạo connection
const client = postgres(connectionString)
export const db = drizzle(client)

// Database schema definitions
import { pgTable, serial, varchar, text, integer, boolean, timestamp, jsonb, inet } from "drizzle-orm/pg-core"

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  full_name: varchar("full_name", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(),
  student_id: varchar("student_id", { length: 20 }),
  phone: varchar("phone", { length: 20 }),
  avatar_url: text("avatar_url"),
  status: varchar("status", { length: 20 }).default("active"),
  email_verified: boolean("email_verified").default(false),
  last_login: timestamp("last_login"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  language: varchar("language", { length: 20 }).notNull(),
  level: varchar("level", { length: 20 }).notNull(),
  duration_weeks: integer("duration_weeks"),
  instructor_id: integer("instructor_id").references(() => users.id),
  thumbnail_url: text("thumbnail_url"),
  status: varchar("status", { length: 20 }).default("draft"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

// Course enrollments table
export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  course_id: integer("course_id").references(() => courses.id),
  enrolled_at: timestamp("enrolled_at").defaultNow(),
  completed_at: timestamp("completed_at"),
  progress_percentage: integer("progress_percentage").default(0),
})

// System logs table
export const systemLogs = pgTable("system_logs", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  details: jsonb("details"),
  ip_address: inet("ip_address"),
  user_agent: text("user_agent"),
  created_at: timestamp("created_at").defaultNow(),
})

// Export types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert
