import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/database.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgresql://username:password@localhost:5432/perl_python_learning",
  },
} satisfies Config
