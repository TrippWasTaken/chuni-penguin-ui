import React from "react"

interface Props {
  category: {
    name: string
    values: string[]
  }
  selected: string
  setter: Function
}
export default function FilterCategoryRadio({
  category,
  setter,
  selected,
}: Props) {
  return (
    <ul className="flex gap-4">
      {category.values.map((value, i) => (
        <li key={i}>
          <input
            type="radio"
            name={category.name}
            value={value}
            className="hidden peer"
            id={category.name + "_" + value}
            defaultChecked={selected === value}
            onChange={(e) => setter(e.target.value)}
          />
          <label
            htmlFor={category.name + "_" + value}
            className="opacity-75 peer-checked:opacity-1 font-light peer-checked:font-extrabold cursor-pointer">
            {value}
          </label>
        </li>
      ))}
    </ul>
  )
}
