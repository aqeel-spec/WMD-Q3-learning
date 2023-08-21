import { ZodError } from "zod";
import { hash } from "bcryptjs";
import { db } from "@/lib/db/drizzle";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { getErrorResponse } from "@/lib/helpers";
import { class_4_5_user } from "@/lib/db/schema/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body); // check if data is valid
    const hashedPassword = await hash(data.password, 12);
    const user = await db
      .insert(class_4_5_user)
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
