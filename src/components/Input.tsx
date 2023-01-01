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
        className="text-field"
      />
    </div>
  );
}

export default Input;
