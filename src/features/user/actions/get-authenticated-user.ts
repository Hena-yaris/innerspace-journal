
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { connectDB } from "@/src/lib/mongodb";
import { User } from "@/src/models/user.model";


//Just gets the ID from the cookie
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


// 2. The Full Uses the ID helper, then hits the DB
export async function getAuthenticatedUser() {
  const userId = await getSessionId();
  if (!userId) return null;

  await connectDB();
  return await User.findById(userId).lean();
}
