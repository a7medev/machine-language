import { useState } from 'react';

function useMemory(count: number) {
  const [memory, setMemory] = useState<number[]>(() =>
    new Array(count).fill(0)
  );

  const store = (address: number, value: number) =>
    setMemory((memory) =>
      memory.map((current, index) => (index === address ? value : current))
    );

  return [memory, store] as const;
}

export default useMemory;
