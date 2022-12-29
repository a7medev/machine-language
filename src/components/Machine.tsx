import { useState } from 'react';
import useMemory from '../hooks/useMemory';
import Button from './Button';
import Input from './Input';
import Memory from './Memory';
import StoreMemoryForm from './StoreMemoryForm';

const REGISTERS_COUNT = 16;
const MEMORY_CELLS_COUNT = 256;

function Machine() {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [registers, storeRegister] = useMemory(REGISTERS_COUNT);
  const [memory, storeMemory] = useMemory(MEMORY_CELLS_COUNT);

  const handleRun = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="grid grid-cols-3">
      <aside className="px-3 pb-5 overflow-scroll">
        <section className="mb-3">
          <h3 className="font-bold text-lg mb-2">Execution</h3>
          <Input
            id="counter-input"
            label="Counter"
            value={counter}
            onChange={(e) => setCounter(+e.target.value)}
            readOnly={isRunning}
          />
          <span className="mr-2">
            <Button disabled={isRunning} onClick={handleRun}>
              Run
            </Button>
          </span>
          <Button disabled={!isRunning} onClick={handleStop}>
            Stop
          </Button>
        </section>

        <section className="mb-3">
          <h3 className="font-bold text-lg mb-2">Store in Memory</h3>
          <StoreMemoryForm onStore={storeMemory} />
        </section>
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
