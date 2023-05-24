interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | undefined;
  placeholder: string | undefined;
  icon?: React.ReactNode;
  className?: string | undefined;
  newComment?: boolean;
  errorInput?: boolean;
  onChange?: () => void;
}

export const Input = ({
  label,
  placeholder,
  icon,
  className,
  newComment,
  errorInput,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <>
      <label className={`mb-2 text-gray-100 text-lg`}>{label}</label>
      <div className='relative'>
        {icon}
        <input
          {...rest}
          className={`bg-black-600 rounded h-12 ${
            newComment ? 'w-[550px]' : 'w-[400px]'
          } text-secondary placeholder:text-secondary pl-[52px] pr-4 py-3 text-sm focus-within:ring-2 ${
            errorInput ? 'ring-2 ring-red' : 'focus-within:ring-primary'
          } ${className}`}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
};
