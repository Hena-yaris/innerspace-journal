import { NextResponse } from "next/server";

import { loginAction } from "@/src/features/auth/actions/login.action";
import { setAuthCookie } from "@/src/features/auth/utils/set-auth-cookie";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await loginAction(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  const response = NextResponse.json({
    success: true,
  });

  setAuthCookie(response, result.token);

  return response;
}
