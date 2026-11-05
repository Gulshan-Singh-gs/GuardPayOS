import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgres://neondb_owner:dummy@ep-dummy-123456.us-east-2.aws.neon.tech/neondb?sslmode=require',
  },
});

