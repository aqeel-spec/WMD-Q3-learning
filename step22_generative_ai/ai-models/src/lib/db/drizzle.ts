import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
// import { sql } from "@vercel/postgres";
// import { drizzle } from "drizzle-orm/vercel-postgres";
import * as aiProducts from './schema/aiProducts';
const querydb = postgres(process.env.DATABASE_URL as string + '?sslmode=require' || '');

export const db = drizzle( querydb , {
	schema: {
        ...aiProducts
    },
});