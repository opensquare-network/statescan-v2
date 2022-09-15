import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";

const BTN = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background: ${(p) => p.theme.fillButton};
  color: ${(p) => p.theme.fontPrimaryInverse};
  border-radius: 8px;
  cursor: pointer;
  ${Inter_14_500};
`;

export function Button(props) {
  return <BTN {...props} />;
}
