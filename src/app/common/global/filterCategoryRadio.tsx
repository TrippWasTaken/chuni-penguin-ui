import React from "react";

interface Props {
  category: {
    name: string;
    values: string[];
  };
  setter: () => void;
}
export default function FilterCategoryRadio({ category, setter }: Props) {
  return (
    <ul className="flex gap-4">
      {category.values.map((value, i) => (
        <li key={i}>
          <input
            type="radio"
            name={category.name}
            value={value}
            className="hidden peer"
            id={value}
            defaultChecked={i === 0}
          />
          <label
            htmlFor={value}
            className="opacity-75 peer-checked:opacity-1 font-light peer-checked:font-extrabold cursor-pointer"
          >
            {value}
          </label>
        </li>
      ))}
    </ul>
  );
}
