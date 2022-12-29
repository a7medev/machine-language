import { useState } from 'react';

function useMemory(count: number) {
  const [memory, setMemory] = useState<number[]>(() =>
    new Array(count).fill(0)
  );

  const store = (address: number, value: number) => {
    // Ensure value fits in a single byte
    const fit = value & 0xff;

    setMemory((memory) =>
      memory.map((current, index) => (index === address ? fit : current))
    );
  };

  return [memory, store] as const;
}

export default useMemory;
