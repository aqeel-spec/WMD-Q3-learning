import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { getErrorResponse } from "@/lib/helpers";
import { class_4_5_user } from "@/lib/db/schema/user";
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
    .from(class_4_5_user)
    .where(eq(class_4_5_user.user_id, Number(userId)));
  return NextResponse.json({
    status: "success",
    data: { user: { ...user[0], password: undefined } },
  });
}