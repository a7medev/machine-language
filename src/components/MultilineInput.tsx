import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

interface MultilineInputProps extends TextareaAutosizeProps {
  label: string;
  id: string;
}

function MultilineInput({
  id,
  label,
  placeholder,
  ...props
}: MultilineInputProps) {
  return (
    <div className="mb-3">
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <TextareaAutosize
        {...props}
        id={id}
        placeholder={placeholder ?? label}
        className="text-field"
      />
    </div>
  );
}

export default MultilineInput;
