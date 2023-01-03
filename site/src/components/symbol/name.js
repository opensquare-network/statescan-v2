import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";

const Name = styled.span`
  color: ${(p) => p.theme.fontTertiary};
  ${Inter_14_500};
`;

export default function SymbolName({ name }) {
  return <Name title={name}>{name}</Name>;
}
