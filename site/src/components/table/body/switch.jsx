import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";

const Wrapper = styled.span`
  white-space: nowrap;
  ${Inter_14_500};
`;

export default function SwitchBody({ switchHeadFirst, value }) {
  const values = Array.isArray(value) ? value : [value];

  return <Wrapper>{values[switchHeadFirst ? 0 : 1]}</Wrapper>;
}
