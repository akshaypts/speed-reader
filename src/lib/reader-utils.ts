export function getPivotIndex(word: string): number {
  if (!word || word.length === 0) return 0;

  // Logic to find the "optical center" or optimal viewing position.
  // A simple heuristic is:
  // length 1: 0 (0-indexed)
  // length 2-5: 1
  // length 6-9: 2
  // length 10-13: 3
  // length 14+: 4
  // Roughly 1/4th to 1/3rd into the word, but tailored for speed reading.
  // Commonly used ORP (Optimal Recognition Point) formula usually leans slightly left of center.

  const length = word.length;
  let pivot = Math.floor((length - 1) / 2);

  // Correction for longer words to keep it slightly left which is often better
  if (length > 13) pivot = 4;
  else if (length > 9) pivot = 3;
  else if (length > 5) pivot = 2;
  else if (length > 1) pivot = 1;

  return pivot;
}

export function splitTextIntoWords(text: string): string[] {
    // Remove citation markers like [1], [12], etc.
    const cleanText = text.replace(/\[\d+\]/g, '');
    return cleanText.trim().split(/\s+/).filter(w => w.length > 0);
}
