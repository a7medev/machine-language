import { useState } from 'react';
import useMemory from '../hooks/useMemory';
import Memory from './Memory';
import StoreMemoryForm from './StoreMemoryForm';

const REGISTERS_COUNT = 16;
const MEMORY_CELLS_COUNT = 256;

function Machine() {
  const [counter, setCounter] = useState(0);
  const [registers, storeRegister] = useMemory(REGISTERS_COUNT);
  const [memory, storeMemory] = useMemory(MEMORY_CELLS_COUNT);

  return (
    <div className="grid grid-cols-3">
      <aside className="px-3 pb-5 overflow-scroll">
        <h3 className="font-bold text-lg mb-2">Store in Memory</h3>
        <StoreMemoryForm onStore={storeMemory} />
      </aside>
      <aside className="h-full overflow-scroll">
        <Memory cells={memory} title="Memory" />
      </aside>
      <aside className="h-full overflow-scroll">
        <Memory cells={registers} title="Registers (CPU)" />
      </aside>
    </div>
  );
}

export default Machine;
