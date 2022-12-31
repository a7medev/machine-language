/**
 * Convertion to and from 8-bit floating point notation.
 * Stored as 1 bit for the sign, 3 bits for the exponent stored in excess 4, 4 bits for the mantissa
 * S EEE MMMM
 * decimal = (-1)^S * 0.MMMM * 2^(EEE - 4)
 */

const EXCESS_OFFSET = 4;

export function toFloat(num: number) {
  const str = num.toString(2);
  // Sign as 1 for -ve and 0 for +ve
  const sign = str[0] === '-' ? 1 : 0;
  // Bits without the point
  const digits = Math.abs(parseInt(str.replace('.', ''), 2)).toString(2);

  // Mantissa of 4 bits
  // If < 4 bits add 0's to the right
  // Else truncate the bits
  const mantissa = parseInt(
    digits.length < 4 ? digits.padEnd(4, '0') : digits.substring(0, 4),
    2
  );

  // Exponent in excess 4 notation
  // Divide actual number by 0.MMMM (mantissa / 2^4)
  // Add excess offset of 4
  const exp = Math.floor(
    Math.log2(Math.abs(num) / mantissa) + 4 + EXCESS_OFFSET
  );

  return (sign << 7) | (exp << 4) | mantissa;
}

export function toDec(float: number) {
  // Extract sign, exponent and mantissa by masking
  const sign = (float & 0b10000000) >> 7;
  const exp = ((float & 0b01110000) >> 4) - EXCESS_OFFSET;
  const mantissa = float & 0b00001111;

  return Math.pow(-1, sign) * mantissa * Math.pow(2, exp - 4);
}
