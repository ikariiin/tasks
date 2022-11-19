export function getContrastTextColor(color: string): string {
  const r = parseInt(color.replace("#", "").substring(0, 2), 16);
  const g = parseInt(color.replace("#", "").substring(2, 4), 16);
  const b = parseInt(color.replace("#", "").substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#000000" : "#ffffff";
}
