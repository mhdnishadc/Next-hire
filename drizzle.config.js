// import { defineConfig } from "drizzle-kit";
/** @type { import('drizzle-kit').Config} */

export default({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_HEl8t3kNhPYL@ep-wispy-field-a5ytp44b-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
  }
});
