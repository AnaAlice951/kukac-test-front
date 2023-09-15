import { LegacyRef } from "react";

type SelectProps = {
  setValue: (e: string) => void;
  firstOptionValue: number | string;
  secondOptionValue: number | string;
  optionPlaceholder: string;
  firstOptionName?: string;
  secondOptionName?: string;
  optionRef?: LegacyRef<HTMLOptionElement>;
};

const Select = ({
  setValue,
  firstOptionValue,
  secondOptionValue,
  optionPlaceholder,
  firstOptionName,
  secondOptionName,
  optionRef,
}: SelectProps) => {
  return (
    <select
      required
      onChange={(e) => setValue(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 w-[550px] max-sm:w-full"
    >
      <option
        id="defaultOption"
        ref={optionRef}
        value=""
        disabled
        selected
        hidden
      >
        {optionPlaceholder}
      </option>
      <option value={firstOptionValue}>
        {firstOptionName || firstOptionValue}
      </option>
      <option value={secondOptionValue}>
        {secondOptionName || secondOptionValue}
      </option>
    </select>
  );
};

export default Select;
