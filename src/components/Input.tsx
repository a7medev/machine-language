interface InputProps extends React.ComponentProps<'input'> {
  label: string;
  id: string;
}

function Input({ id, label, placeholder, ...props }: InputProps) {
  return (
    <div className="mb-3">
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        {...props}
        id={id}
        placeholder={placeholder ?? label}
        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded w-full"
      />
    </div>
  );
}

export default Input;
