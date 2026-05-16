import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    secretKey: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      default: "ሄኖክ",
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
