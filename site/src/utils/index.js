/**
 * @param {number} number
 * @description wrapped `toLocaleString`
 * @example 123456789 -> 123,456,789
 */
export function currencify(number = 0) {
  return number.toLocaleString();
}
