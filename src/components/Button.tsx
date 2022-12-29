interface ButtonProps extends React.ComponentProps<'button'> {}

function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-blue-600 text-white rounded transition-colors hover:bg-blue-700 dark:bg-blue-400 dark:text-gray-800 dark:hover:bg-blue-300"
    />
  );
}

export default Button;
