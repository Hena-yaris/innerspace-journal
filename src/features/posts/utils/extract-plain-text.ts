export function extractPlainText(json: any): string {
  try {
    if (!json) return "";
    if (typeof json === "string") return json;

    const extract = (node: any): string => {
      if (node.type === "text") return node.text || "";

      if (node.content && Array.isArray(node.content)) {
        return node.content.map(extract).join(" ");
      }

      return "";
    };

    return extract(json).trim().substring(0, 120) + "...";
  } catch {
    return "Exploring new thoughts...";
  }
}
