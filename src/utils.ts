export function range(count: number): number[] {
  return Array(count)
    .fill(null)
    .map((_, index) => index);
}

export function shuffle(inputArray: unknown[]) {
  return [...inputArray].sort(() => (Math.random() > 0.5 ? 1 : -1));
}
