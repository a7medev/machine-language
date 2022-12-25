import { FormEvent } from 'react';
import Input from './Input';
import Button from './Button';

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
    const content = parseInt(form.content.value, base);

    if (Number.isNaN(content)) {
      return alert(
        `Content is not a valid base ${base} number. Please enter a valid number.`
      );
    }

    onStore(address, content);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <Input
        id="address-input"
        name="address"
        label="Address"
        placeholder="Address in hexadecimal (e.g. 3E)"
      />
      <Input id="content-input" name="content" label="Content" />

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
