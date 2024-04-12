import styled from "styled-components";
import { Option } from "./Option";

interface NationboxProps {
  field: object;
}

function NationBox({ field }: NationboxProps) {
  return (
    <Select {...field}>
      {Option.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}

export default NationBox;
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
