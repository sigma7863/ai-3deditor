const colors = [
  "#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3",
  "#54a0ff", "#5f27cd", "#01a3a4", "#f368e0",
  "#ff6348", "#7bed9f", "#70a1ff", "#ffa502"
];

let idx = 0;

export function nextColor(): string {
  const c = colors[idx % colors.length];
  idx++;
  return c;
}
