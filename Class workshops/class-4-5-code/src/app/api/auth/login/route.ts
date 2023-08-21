import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { ZodError } from "zod";
import { db } from "@/lib/db/drizzle";
import { signJWT } from "@/lib/token";
import { class_4_5_user } from "@/lib/db/schema/user";
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
        user_id: class_4_5_user.user_id,
        password: class_4_5_user.password,
      })
      .from(class_4_5_user)
      .where(eq(class_4_5_user.email, data.email));
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