export function serialize(doc: any) {
  return JSON.parse(JSON.stringify(doc));
}
