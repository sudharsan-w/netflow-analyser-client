import { ReactNode, useState } from "react";

export type Option = {
  displayName: string;
  value: any;
};

type Props = {
  options: Array<Option>;
  className?: string;
  selectedOption: any;
  setSelectedOption: React.Dispatch<React.SetStateAction<any>>;
};

const SimpleSelect = ({
  setSelectedOption,
  selectedOption,
  options,
}: Props): ReactNode => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log("Selected:", event.target.value);
  };

  return (
    <div >
      <select
        value={selectedOption}
        onChange={handleChange}
        className={`rounded-lg px-1 py-1 outline-none`}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value} >{option.displayName}</option>
        ))}
      </select>
    </div>
  );
};

export default SimpleSelect;
