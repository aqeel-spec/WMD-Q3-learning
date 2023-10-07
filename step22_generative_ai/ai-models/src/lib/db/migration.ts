/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL= process.env.DATABASE_URL ;

console.log("database url",DATABASE_URL)
const runMigrate = async () => {
	if (!DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined');
	}
    const connectionString = drizzle(postgres(`${DATABASE_URL+ '?sslmode=require' || ''}`));
    // const connectionString = DATABASE_URL+ '?sslmode=require' || ''
    // const sql = postgres(connectionString, { max: 1 });
	// const db = drizzle(connectionString);
	console.log('⏳ Running migrations...');
    // *** check if the connection is ok or not
    // console.log("connectionString",connectionString)
    // res like this = connectionString postgres://default:(some link)/verceldb?sslmode=require

	const start = Date.now();
	await migrate(connectionString, { migrationsFolder: 'drizzle' });

	const end = Date.now();
	console.log(`✅ Migrations completed in ${end - start}ms`);

	process.exit(0);
};

runMigrate().catch((err) => {
	console.error('❌ Migration failed');
	console.error(err);
	process.exit(1);
});