import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getSessionId() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

    return payload.id as string;
  } catch {
    return null;
  }
}
