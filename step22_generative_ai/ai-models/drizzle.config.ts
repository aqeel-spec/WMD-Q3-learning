import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();
 

const dbConnection = process.env.DATABASE_URL + '?sslmode=require' || ''

export default {
  schema: "./src/lib/db/schema/*", // it will take all files from schema path
  out: "./drizzle", // output dir. of our schema
  driver: 'pg',
	dbCredentials: {
		connectionString: dbConnection,
	},
	breakpoints: true,
} satisfies Config