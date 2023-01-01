import { FormEvent } from 'react';
import Input from './Input';
import Button from './Button';
import MultilineInput from './MultilineInput';

interface Form extends Element {
  base: RadioNodeList;
  address: HTMLInputElement;
  content: HTMLInputElement;
}

interface StoreMemoryFormProps {
  onStore: (address: number, content: number) => void;
}

function StoreMemoryForm({ onStore }: StoreMemoryFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as Form;
    const base = +form.base.value;
    const address = parseInt(form.address.value, 16);
    const content = form.content.value.replaceAll(/\s/g, '');

    if (base === 10) {
      const value = parseInt(content);
      if (value < 0 || value > 255) {
        return alert(`${content} cannot be stored in 1 byte.`);
      }
      if (Number.isNaN(content)) {
        return alert(
          `${content} is not a valid decimal number. Please enter a valid number.`
        );
      }
      onStore(address, value);
    } else {
      const size = 8 / Math.log2(base);
      for (let i = 0; i < content.length / size; i++) {
        const str = content.substring(i * size, i * size + size);
        const value = parseInt(str, base);
        if (Number.isNaN(value)) {
          return alert(
            `${str} is not a valid base ${base} number. Please enter a valid number.`
          );
        }
        onStore(address + i, value);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <Input
        id="address-input"
        name="address"
        label="Start Address"
        placeholder="Start address in hexadecimal (e.g. 3E)"
      />
      <MultilineInput
        id="content-input"
        name="content"
        label="Content"
        placeholder={'2145\n3100\nC000'}
        minRows={3}
      />

      <div className="mb-4">
        <label className="mr-3">
          <input type="radio" value="2" name="base" className="mr-1" />
          Binary
        </label>
        <label className="mr-3">
          <input type="radio" value="10" name="base" className="mr-1" />
          Decimal
        </label>
        <label className="mr-3">
          <input
            type="radio"
            value="16"
            name="base"
            defaultChecked
            className="mr-1"
          />
          Hexadecimal
        </label>
      </div>
      <Button type="submit">Store</Button>
    </form>
  );
}

export default StoreMemoryForm;
