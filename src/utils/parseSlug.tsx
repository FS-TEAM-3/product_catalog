export interface ParsedSlug {
  itemId: string;
  capacity: string;
  color?: string;
}

export function parseSlug(slug: string): ParsedSlug {
  let color: string | undefined;

  console.log(slug);
  const regex = /^([a-z0-9-]+)-(\d+(?:gb|mm))-([a-z-]+)$/i;
  const match = slug.match(regex);

  if (match) {
    const itemId = match[1];
    const capacity = match[2];
    return { itemId, capacity, color };
  }

  return { itemId: '', capacity: '', color: '' };
}
