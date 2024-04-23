import styled from "styled-components";
import { Option } from "./Option";

interface NationboxProps {
  field: object;
}

function NationBox({ field }: NationboxProps) {
  return (
    <Select {...field}>
      {Option.map((option) => (
        <option key={option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}

export default NationBox;
const Select = styled.select`
  margin-top: 13.5px;
  width: 220px;
  height: 40px;
  display: block;
  border-radius: 5px;
  text-align: center;
  border: 1px solid;
  font-size: 1.3rem;

  @media screen and (max-width: 767px) {
    margin-top: 13.5px;
    width: 200px;
    height: 40px;
    display: block;
    border-radius: 5px;
    text-align: center;
    border: 1px solid;
    font-size: 1.3rem;
  }
`;
