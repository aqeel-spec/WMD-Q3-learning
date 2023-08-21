# JWT Authentication #
*  [JSON Web Tokens](https://jwt.io/introduction)
* JWT Authentication in Next.js 13 [API Route Handlers](https://github.com/hassan-ak/PIAIC-WMD-Q3/tree/main/a_onsite_lectures/class04-20230806/nextjs13-user-signin-signup)

## Topics Covered ##
+ Introduction and working of JSON Web Tokens
   - Create next app
   - Deploy on vercel
   - Connect with vercel postgres storage
   - Create sql queries
   - Run migrations
   - Run drizzle studio
* This site was built using [GitHub Pages](https://pages.github.com/).
# JWT Authentication in Next.js 13 API Route Handlers
## Create a Next.JS 13 app 
1. Create a new nextJS app using following command
```npx
   npx create-next-app@latest
```
2. Select the following options when prompted

```bash
   Need to install the following packages:
   create-next-app@13.4.13
   Ok to proceed? (y)
   ✔ What is your project named? … nextjs13-user-signin-signup
   ✔ Would you like to use TypeScript? … Yes
   ✔ Would you like to use ESLint? … Yes
   ✔ Would you like to use Tailwind CSS? … Yes
   ✔ Would you like to use `src/` directory? … Yes
   ✔ Would you like to use App Router? (recommended) … Yes
   ✔ Would you like to customize the default import alias? … No
```
3. Navigate to newly created application directory
```cmd
   cd nextjs13-user-signin-signup
```
4. Run the app in development mode
```npm
   npm run dev
```
### Deploy the app on vercel
5. Sign up or log in at [vercel](https://vercel.com/dashboard)
6. Install vercel cli
```npm
   npm i -g vercel
```
7. From the terminal log in to vercel
```cmd
   vercel login
```
8. Deploy the app
```cmd
   vercel   
```
### Connect to vercel postgres
9. On vercel dashboard navigate to storage tab and create a new postgres storage. You can also select an already created storage
10. Connect the deployed project with the selected storage
11. Pull your latest environment variables
```cmd
   vercel env pull .env.development.local
```
12. Install postgres and drizzle in the app
```npm
   npm i drizzle-orm
   npm i @vercel/postgres
   npm i -D drizzle-kit
```
13. Create `/src/lib/db/drizzle.ts` to define db connection
```ts
   import { sql } from "@vercel/postgres";
   import { drizzle } from "drizzle-orm/vercel-postgres";
   export const db = drizzle(sql);
```
### Create schema and infer types
14. Create `/src/lib/db/schema/script.ts or schema/user , cart , orders etc.` to define tables schema
```javascript
   import {
     pgTable,
     serial,
     varchar,
     boolean,
     timestamp,
   } from "drizzle-orm/pg-core";
   export const jwt_users = pgTable("jwt_users", {
     user_id: serial("user_id").primaryKey(),
     name: varchar("name", { length: 256 }).notNull(),
     email: varchar("email", { length: 256 }).notNull().unique(),
     password: varchar("password", { length: 256 }).notNull(),
     role: varchar("role", { length: 256 }).default("user"),
     photo: varchar("photo", { length: 256 }).default(
       "https://res.cloudinary.com/dgeqvleeq/image/upload/v1691703822/profile_r6ipcc.jpg"
     ),
     verified: boolean("verified").default(false),
     created_at: timestamp("created_at").defaultNow(),
     updatedAt: timestamp("updatedAt").defaultNow(),
   });
```
### OR With Types
   ```javascript
      import { pgTable, serial, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
      import { InferModel } from 'drizzle-orm';
      
      export const class_4_5_user = pgTable('class_4_5_user', {
        user_id: serial('user_id').primaryKey(),
        name:varchar("name",{length:256}).notNull(),
        email:varchar("email",{length:256}).notNull().unique(),
        password:varchar("password",{length:256}).notNull(),
        role:varchar("role",{length:256}).default("user"),
        photo:varchar("photo",{length:256}).default("default.png"),
        verified:boolean("verified").default(false),
        created_at: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updatedAt').defaultNow(),
      });
      
      export type User = InferModel<typeof class_4_5_user> 
      export type NewUser = InferModel <typeof class_4_5_user , "insert" >
   ```
15. Create `/src/lib/db/dbTypes.ts` to infer types from the defined tables
     ```ts
      import { InferModel } from 'drizzle-orm';
      import { class_4_5_user } from './schema/user';
      export type User = InferModel<typeof class_4_5_user>  // user types
      export type NewUser = InferModel <typeof class_4_5_user , "insert" > // add new user to db
    ```
16. Create drizzle configuration file `drizzle.config.ts` at root level
    ```javascript
      import type { Config } from "drizzle-kit";
      import dotenv from "dotenv";
      dotenv.config();
       
      export default {
        schema: "./src/lib/db/schema/*", // it will take all files from schema path
        out: "./drizzle", // output dir. of our schema
      } satisfies Config
    ```
17. install package
    ```npm
       npm i dotenv
    ```
19. Update `package.json` and add following to `scripts`
    ```json
    "generate": "drizzle-kit generate:pg --schema=./src/lib/db/schema/*",
    "drop": "drizzle-kit drop --out=drizzle"
    ```
20. Update `"target": "es5",` to `"target": "ES2022",` in `tsconfig.json`
21. Run following to create queries from schema, this will create a `.sql` file in `drizzle` npm run generate
    ```npm
    npm run generate

### Setup for running migrations to reflect schema changes on db

20. Install following dependencies to use .env variables
    ```npm
    npm i dotenv
    ```
21. Create `.env` file with the following content
    ```env
    POSTGRES_URL="YOUR_POSTGRES_URL"
    ```
22. Replace content of `drizzle.config.ts` with the following
    ```ts
    import type { Config } from "drizzle-kit";
    import dotenv from "dotenv";
    dotenv.config();
    export default {
      schema: "./src/lib/db/schema/script.ts",
      out: "./drizzle",
      driver: "pg",
      dbCredentials: {
        connectionString: process.env.POSTGRES_URL + "?sslmode=require" || "",
      },
    } satisfies Config;
    ```
23. Follow one of the next two sections to run migrations

### Run Migrations if storage is connected with single application only

- Follow this section only if new storage is created for this application. In case if you are using any storage with some old data or it is connected to some other application too, running the migration this way will update all the tables in the db based on the schema defined in this application. It will delete or modify all other tables from the db which are not defined in the schema. If you are using a storage with some other applications connected to it skip this section and move to next one.

24. create `/src/lib/db/migrate.ts`
    * Go to file `/src/lib/db/mirtate.ts` to get Full page
26. Update `package.json` and add following to `scripts`
    + This command will create table on vercel database
    ```json
    "migrate": "node -r esbuild-register  src/lib/db/migrate.ts"
    ```
27. Run the migrations
    ```npm
    npm run migrate
    ```
### Run Migrations if storage is connected to multiple applications

- Follow this section if storage is connected to multiple applications. Running migrations this way will not alter any previously stored data in the db. If you already followed the above section skip this one.

27. Install following dependencies
    ```npm
    npm i esbuild-register
    npm i postgres
    ```
28. create `/src/lib/db/migrate.ts` to handle migration
    ```ts
    import { drizzle } from "drizzle-orm/postgres-js";
    import { migrate } from "drizzle-orm/postgres-js/migrator";
    import postgres from "postgres";
    import dotenv from "dotenv";
    dotenv.config();
    const connectionString =
      process.env.POSTGRES_URL + "?sslmode=require" || "";
    const sql = postgres(connectionString, { max: 1 });
    const db = drizzle(sql);
    migrate(db, { migrationsFolder: "drizzle" })
      .then((msg) => {
        console.log("Migration successful ===> ", msg);
      })
      .catch((err) => {
        console.log("Migration failed ===> ", err);
      });
    ```
29. Update `package.json` and add following to `scripts`
    ```json
    "migrate": "node -r esbuild-register src/lib/db/migrate.ts"
    ```
30. Run the migrations
    ```npm
    npm run migrate
    ```
### Run drizzle studio

31. Install following to use drizzle studio
    ```npm
    npm i pg
    ```
32. Update `package.json` and add following to `scripts`
    ```json
    "drizzle": "drizzle-kit studio --port 5555"
    ```
33. Run the following to open drizzle studio
    ```npm
    npm run drizzle
    ```
33. Drizzle studio can be accessed at the following link
    ```
    http://127.0.0.1:5555/
    ```
34. Visiting drizzle studio will results in following

    ![drizzle studio](./public/drizzle_home.jpg]

# Class 5 JWT-AUTH COMPLETE follow tutorial

# JWT Authentication in Next.js 13 API Route Handlers
* If you haven't yet finished tasks like creating a Next.js app, linking it with Vercel's PostgreSQL, configuring the database layout, executing migration queries, or using Drizzle Studio, please complete those steps first.

# Create API Route Handler to Handle User Registration
* As we are creating an application where a user can register.
* For user registration name, email and password is required, we also need to confirm the password.
* User will register through a form which will interact with the db through and api
* We have to validate user inputs on the form as well in the api so first define a validation schema using zod

1. Install zod for validation
   ```npm
      npm i zod
   ```
2.Create `/src/lib/validations/user.schema.ts` to define validation schema for validating registration data and also define types
   ```ts
   import { z } from "zod";
   export const RegisterUserSchema = z
     .object({
       name: z
         .string({
           required_error: "Name is required",
         })
         .min(1, "Full name is required"),
       email: z
         .string({
           required_error: "Email is required",
         })
         .min(1, "Email is required")
         .email("Email is invalid"),
       photo: z.string().optional(),
       password: z
         .string({
           required_error: "Password is required",
         })
         .min(1, "Password is required")
         .min(8, "Password must be more than 8 characters")
         .max(32, "Password must be less than 32 characters"),
       passwordConfirm: z
         .string({
           required_error: "Confirm your password",
         })
         .min(1, "Confirm your password"),
     })
     .refine((data) => data.password === data.passwordConfirm, {
       path: ["passwordConfirm"],
       message: "Passwords do not match",
     });
   export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
   ```
3. Create `/src/lib/helpers.ts` to define a function to return a Next.js API error response.
   ```ts
   import { ZodError } from "zod";
   import { NextResponse } from "next/server";
   export function getErrorResponse(
     status: number = 500,
     message: string,
     errors: ZodError | null = null
   ) {
     return new NextResponse(
       JSON.stringify({
         status: status < 500 ? "fail" : "error",
         message,
         errors: errors ? errors.flatten() : null,
       }),
       {
         status: status,
         headers: { "Content-Type": "application/json" },
       }
     );
   }
   ```
4. Install bcryptjs and its types for hashing user password
   ```npm
      npm i bcryptjs
      npm i -D @types/bcryptjs
   ```
5. Create `src/app/api/auth/register/route.ts` to define an api endpoint for account registration
   ```ts
   import { ZodError } from "zod";
   import { hash } from "bcryptjs";
   import { db } from "@/lib/db/drizzle";
   import {
     RegisterUserInput,
     RegisterUserSchema,
   } from "@/lib/validations/user.schema";
   import { getErrorResponse } from "@/lib/helper";
   import { jwt_users } from "@/lib/db/schema/script";
   import { NextRequest, NextResponse } from "next/server";
   export async function POST(request: NextRequest) {
     try {
       const body = (await request.json()) as RegisterUserInput;
       const data = RegisterUserSchema.parse(body);
       const hashedPassword = await hash(data.password, 12);
       const user = await db
         .insert(jwt_users)
         .values({
           name: data.name,
           email: data.email,
           password: hashedPassword,
         })
         .returning();
       return new NextResponse(
         JSON.stringify({
           status: "success",
           data: { user: { ...user[0], password: undefined } },
         }),
         {
           status: 201,
           headers: { "Content-Type": "application/json" },
         }
       );
     } catch (error: any) {
       if (error instanceof ZodError) {
         return getErrorResponse(400, "failed validations", error);
       }
       if (error.code === "23505") {
         return getErrorResponse(409, "user with that email already exists");
       }
       return getErrorResponse(500, error.message);
     }
   }
   ```
6. Update `.env` to include JWT secret key and expiration time
   ```.env
      JWT_SECRET_KEY="SECRET_KEY"
      JWT_EXPIRES_IN="JWT_EXPIRATION_TIME"
   ```
7. Update `/src/lib/helpers.ts` to include function to Get environment variables from the `.env` file
   ```.env
      type EnvVariableKey = "JWT_SECRET_KEY" | "JWT_EXPIRES_IN";
      export function getEnvVariable(key: EnvVariableKey): string {
        const value = process.env[key];
        if (!value || value.length === 0) {
          console.error(`The environment variable ${key} is not set.`);
          throw new Error(`The environment variable ${key} is not set.`);
        }
        return value;
      }
   ```
8. Install `jose`, it gives us the function to sign and verify jwt
   ```npm
      npm i jose
   ```
9. Create `src/lib/token.ts` to define a function that sign the jwt
   ```ts
      import { SignJWT } from "jose";
      import { getEnvVariable } from "./helpers";
      export const signJWT = async (
        payload: { sub: string },
        options: { exp: string }
      ) => {
        try {
          const secret = new TextEncoder().encode(
            getEnvVariable("JWT_SECRET_KEY")
          );
          const alg = "HS256";
          return new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setExpirationTime(options.exp)
            .setIssuedAt()
            .setSubject(payload.sub)
            .sign(secret);
        } catch (error) {
          throw error;
        }
      };
   ```
### Create API Route Handler to Handle User login
10. Update `/src/lib/validations/user.schema.ts` to define validation schema for user login data
   ```ts
      export const LoginUserSchema = z.object({
        email: z
          .string({
            required_error: "Email is required",
          })
          .min(1, "Email is required")
          .email("Email is invalid"),
        password: z
          .string({
            required_error: "Password is required",
          })
          .min(1, "Password is required")
          .min(8, "Password must be at least 8 characters")
          .max(32, "Password must be less than 32 characters"),
      });
      export type LoginUserInput = z.infer<typeof LoginUserSchema>;
   ```
11. Create `src/app/api/auth/login/route.ts` to define an api endpoint to handle login
   ```ts
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { ZodError } from "zod";
import { db } from "@/lib/db/drizzle";
import { signJWT } from "@/lib/token";
import { jwt_users } from "@/lib/db/schema/script";
import { NextRequest, NextResponse } from "next/server";
import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import {
  LoginUserInput,
  LoginUserSchema,
} from "@/lib/validations/user.schema";
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);
    const user = await db
      .select({
        user_id: jwt_users.user_id,
        password: jwt_users.password,
      })
      .from(jwt_users)
      .where(eq(jwt_users.email, data.email));
    if (!user[0] || !(await compare(data.password, user[0].password))) {
      return getErrorResponse(401, "Invalid email or password");
    }
    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");
    const token = await signJWT(
      { sub: `${user[0].user_id}` },
      { exp: `${JWT_EXPIRES_IN}m` }
    );
    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token: token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };
    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);
    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }
    return getErrorResponse(500, error.message);
  }
}
   ```
### Create API Route Handlers to Handle logout and fetch user details
12. Create `src/app/api/auth/logout/route.ts` to define an api endpoint to handle logout
   ```ts
      import { NextRequest, NextResponse } from "next/server";
      export async function GET(req: NextRequest) {
        const response = new NextResponse(JSON.stringify({ status: "success" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
        await Promise.all([
          response.cookies.set({
            name: "token",
            value: "",
            maxAge: -1,
          }),
          response.cookies.set({
            name: "logged-in",
            value: "",
            maxAge: -1,
          }),
        ]);
        return response;
      }
   ```
13. Create `src/app/api/users/me/route.ts` to define an api endpoint to get user details
   ```ts
      import { eq } from "drizzle-orm";
      import { db } from "@/lib/db/drizzle";
      import { getErrorResponse } from "@/lib/helpers";
      import { jwt_users } from "@/lib/db/schema/script";
      import { NextRequest, NextResponse } from "next/server";
      export async function GET(req: NextRequest) {
        const userId = req.headers.get("X-USER-ID");
        if (!userId) {
          return getErrorResponse(
            401,
            "You are not logged in, please provide token to gain access"
          );
        }
        const user = await db
          .select()
          .from(jwt_users)
          .where(eq(jwt_users.user_id, Number(userId)));
        return NextResponse.json({
          status: "success",
          data: { user: { ...user[0], password: undefined } },
        });
      }
   ```
### Create Functions to Verify the JWTs
14. Update `src/lib/token.ts` and define a function that verify the jwt
   ```ts
      import { jwtVerify } from "jose";
      export const verifyJWT = async <T>(token: string): Promise<T> => {
        try {
          return (
            await jwtVerify(
              token,
              new TextEncoder().encode(process.env.JWT_SECRET_KEY)
            )
          ).payload as T;
        } catch (error) {
          console.log(error);
          throw new Error("Your token has expired.");
        }
      };
   ```
### Create a Next.js Middleware to Protect Routes
15. Create `src/middleware.ts` to define middleware for protecting routes
   ```ts
      import { verifyJWT } from "./lib/token";
      import { getErrorResponse } from "./lib/helpers";
      import { NextRequest, NextResponse } from "next/server";
      export async function middleware(request: NextRequest) {
        let token: string | undefined;
        if (request.cookies.has("token")) {
          token = request.cookies.get("token")?.value;
        } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
          token = request.headers.get("Authorization")?.substring(7);
        }
        if (
          !token &&
          (request.nextUrl.pathname.startsWith("/api/users") ||
            request.nextUrl.pathname.startsWith("/api/auth/logout"))
        ) {
          return getErrorResponse(
            401,
            "You are not logged in. Please provide a token to gain access."
          );
        }
        const response = NextResponse.next();
        try {
          if (token) {
            const { sub } = await verifyJWT<{ sub: string }>(token);
            response.headers.set("X-USER-ID", sub);
          }
        } catch (error) {
          if (request.nextUrl.pathname.startsWith("/api")) {
            return getErrorResponse(
              401,
              "Token is invalid or user doesn't exists"
            );
          }
        }
        return response;
      }
      export const config = {
        matcher: ["/api/users/:path*", "/api/auth/logout"],
      };
   ```
### Test the JWT Authentication
16. Send a post request to `/api/auth/register` with the following body to register a new user
   ```json
      {
        "email": "admin@admin.com",
        "name": "Admin",
        "password": "password123",
        "passwordConfirm": "password123"
      }
   ```
17. Send a post request to `/api/auth/login` with the following body to login
   ```json
      {
        "email": "admin@admin.com",
        "password": "password123"
      }
   ```
18. Send a get request to `/api/users/me` to get details of the logged-in user, this only works when you are already logged-in.
19. Send a get request to `/api/auth/logout` logout, this only works when you are already logged-in



