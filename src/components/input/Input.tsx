type InputProps = {
  setValue: (e: string) => void;
  inputType: "text" | "number";
  inputPlaceholder: string;
  value?: number | string;
  max?: number;
  min?: number;
};

const Input = ({
  setValue,
  inputType,
  inputPlaceholder,
  max,
  value,
  min,
}: InputProps) => {
  return (
    <input
      required
      type={inputType}
      className="appearance-none text-poppins_16 w-[550px] max-sm:w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
      placeholder={inputPlaceholder}
      onChange={(e) => setValue(e.target.value)}
      max={max}
      min={min}
      value={value}
    />
  );
};

export default Input;
