import bcrypt from "bcryptjs";

import { User } from "@/src/models/user.model";
import { generateToken } from "../utils/generate-token";

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return {
    user,
    token,
  };
}
