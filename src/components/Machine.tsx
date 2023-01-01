import { ChangeEvent, useState } from 'react';
import { execute } from '../engine';
import useMemory from '../hooks/useMemory';
import { toHex } from '../utils/bases';
import Button from './Button';
import Input from './Input';
import Memory from './Memory';
import StoreMemoryForm from './StoreMemoryForm';

const REGISTERS_COUNT = 16;
const MEMORY_CELLS_COUNT = 256;

function Machine() {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [registers, setRegisters] = useMemory(REGISTERS_COUNT);
  const [memory, setMemory, storeMemory] = useMemory(MEMORY_CELLS_COUNT);

  const handleCounterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 16);
    setCounter(Number.isNaN(value) ? 0 : value);
  };

  const run = () => {
    setIsRunning(true);
    try {
      const [newCounter, newMemory, newRegisters] = execute(
        counter,
        memory,
        registers
      );

      setCounter(newCounter);
      setMemory(newMemory);
      setRegisters(newRegisters);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      stop();
    }
  };

  const stop = () => {
    setIsRunning(false);
  };

  return (
    <div className="lg:grid lg:grid-cols-3">
      <aside className="px-3 pb-5 overflow-scroll">
        <section className="mb-3">
          <h3 className="font-bold text-lg mb-2">Execution</h3>
          <Input
            id="counter-input"
            label="Counter"
            value={toHex(counter)}
            onChange={handleCounterChange}
            readOnly={isRunning}
          />
          <span className="mr-2">
            <Button disabled={isRunning} onClick={run}>
              Run
            </Button>
          </span>
          <Button disabled={!isRunning} onClick={stop}>
            Stop
          </Button>
        </section>

        <section className="mb-3">
          <h3 className="font-bold text-lg mb-2">Screen</h3>
          <p className="text-gray-600 dark:text-gray-300 italic">
            ASCII text stored in memory cell at address 00
          </p>
          <p className="p-2 text-center border border-gray-200 dark:border-gray-600 rounded">
            {String.fromCharCode(memory[0])}
          </p>
        </section>

        <section className="mb-3">
          <h3 className="font-bold text-lg mb-2">Store in Memory</h3>
          <StoreMemoryForm onStore={storeMemory} />
        </section>
      </aside>
      <aside className="lg:h-full lg:overflow-scroll lg:scroll-p-10 lg:scroll-smooth">
        <Memory id="register" cells={registers} title="Registers (CPU)" />
      </aside>
      <aside className="lg:h-full lg:overflow-scroll lg:scroll-p-10 lg:scroll-smooth">
        <Memory id="memory" cells={memory} title="Memory" />
      </aside>
    </div>
  );
}

export default Machine;
