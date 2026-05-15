import { nanoid } from "nanoid";

export function generateSlug(title: string) {
  return `${title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")}-${nanoid(5)}`;
}
