import styled from "styled-components";
import { Options } from "./Option";

interface SelectboxProps {
  defaultValue: string;
}

function SelectBox({ defaultValue }: SelectboxProps) {
  return (
    <Select required>
      {Options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={defaultValue === option.value ? true : false}
        >
          {option.name}
        </option>
      ))}
    </Select>
  );
}

export default SelectBox;
const Select = styled.select`
  margin-top: 13.5px;
  width: 173px;
  height: 30px;
  display: block;
  border-radius: 5px;
  text-align: center;
  font-size: inherit;
  border: 1px solid;
  font-size: 1rem;
`;
