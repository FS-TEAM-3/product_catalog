export interface ParsedSlug {
  itemId: string;
  capacity: string;
  color?: string;
}

export function parseSlug(slug: string): ParsedSlug {
  const regex = /^([a-z0-9-]+)-(\d+(?:gb|mm|tb))-([a-z-]+)$/i;
  const match = slug.match(regex);

  if (!match) {
    return { itemId: '', capacity: '', color: '' };
  }

  const [, itemId, capacity, color] = match;
  return { itemId, capacity, color };
}
