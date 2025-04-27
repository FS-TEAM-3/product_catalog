export type ParsedSlug = {
  itemId: string;
  capacity: string;
  color: string;
};

export function parseSlug(slug: string): ParsedSlug {
  const parts = slug.split('-');
  const color = parts.pop()!;
  const capacity = parts.pop()!;
  const itemId = parts.join('-');
  return { itemId, capacity, color };
}
