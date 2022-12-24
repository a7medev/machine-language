export function toBin(num: number, digits = 8) {
  return num.toString(2).padStart(digits, '0');
}

export function toHex(num: number, digits = 2) {
  return num.toString(16).padStart(digits, '0').toUpperCase();
}
