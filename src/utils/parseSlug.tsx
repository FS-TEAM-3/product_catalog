import { ColorSlug } from '@/constants/colors';

export interface ParsedSlug {
  itemId: string;
  capacity: string;
  color?: string;
}

export function parseSlug(slug: string): ParsedSlug {
  const allColors = Object.values(ColorSlug);
  let color: string | undefined;
  let withoutColor = slug;

  for (const col of allColors) {
    if (slug.endsWith(`-${col}`)) {
      color = col;
      withoutColor = slug.slice(0, slug.length - col.length - 1);
      break;
    }
  }

  const dash = withoutColor.lastIndexOf('-');
  if (dash === -1) {
    return { itemId: withoutColor, capacity: '', color };
  }

  const itemId = withoutColor.slice(0, dash);
  const capacity = withoutColor.slice(dash + 1);
  return { itemId, capacity, color };
}
