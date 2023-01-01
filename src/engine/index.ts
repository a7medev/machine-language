import { toHex } from '../utils/bases';
import { toDec, toFloat } from '../utils/float';

export class UnknownInstructionError extends Error {
  constructor(public instruction: string) {
    super(`Unknown instruction: ${instruction}`);
    this.name = 'UnknownInstructionError';
  }
}

export function store(memory: number[], address: number, content: number) {
  const fit = content & 0xff;
  memory[address] = fit;
}

export function execute(
  counter: number,
  memory: number[],
  registers: number[]
) {
  const memoryDraft = [...memory];
  const registersDraft = [...registers];
  let c = counter;
  let byte1;
  let byte2;
  let operator;
  let arg1;
  let arg2;
  let arg3;
  while (true) {
    byte1 = memoryDraft[c];
    byte2 = memoryDraft[c + 1];
    operator = Math.floor(byte1 / 0x10);
    arg1 = byte1 - operator * 0x10;
    arg2 = Math.floor(byte2 / 0x10);
    arg3 = byte2 - arg2 * 0x10;

    if (operator === 0x1) {
      // LOAD from memory
      store(registersDraft, arg1, memoryDraft[byte2]);
    } else if (operator === 0x2) {
      // LOAD bit pattern
      store(registersDraft, arg1, byte2);
    } else if (operator === 0x3) {
      // STORE in memory
      store(memoryDraft, byte2, registersDraft[arg1]);
    } else if (byte1 === 0x40) {
      // MOVE register values
      store(registersDraft, arg3, registersDraft[arg2]);
    } else if (operator === 0x5) {
      // ADD two's complement numbers
      store(registersDraft, arg1, registersDraft[arg2] + registersDraft[arg3]);
    } else if (operator === 0x6) {
      // ADD floating point numbers (stored as S EEE MMMM)
      const num1 = toDec(registersDraft[arg2]);
      const num2 = toDec(registersDraft[arg3]);
      const sum = num1 + num2;
      store(registersDraft, arg1, toFloat(sum));
    } else if (operator === 0x7) {
      // OR
      store(registersDraft, arg1, registersDraft[arg2] | registersDraft[arg3]);
    } else if (operator === 0x8) {
      // AND
      store(registersDraft, arg1, registersDraft[arg2] & registersDraft[arg3]);
    } else if (operator === 0x9) {
      // XOR
      store(registersDraft, arg1, registersDraft[arg2] ^ registersDraft[arg3]);
    } else if (operator === 0xa && arg2 === 0) {
      // ROTATE
      const content = registersDraft[arg1];
      // Move first bits into start
      const position = 1 << arg3;
      const divided = content / position;
      const int = Math.floor(divided);
      // Move last bits into end
      const remainder = (divided - int) * position;
      const rotatedPosition = 1 << (8 - arg3);
      const rotated = int + remainder * rotatedPosition;
      store(registersDraft, arg1, rotated);
    } else if (operator === 0xb) {
      // JUMP
      if (registersDraft[arg1] === registersDraft[0]) {
        c = byte2 - 2; // -2 as it will be increased by 2 in at the end of the loop.
      }
    } else if (operator === 0xc && byte2 === 0) {
      // HALT
      c += 2;
      break;
    } else {
      // UNKNOWN
      const instruction = toHex(byte1 * 0x100 + byte2);
      throw new UnknownInstructionError(instruction);
    }

    c += 2;
  }

  return [c, memoryDraft, registersDraft] as const;
}
