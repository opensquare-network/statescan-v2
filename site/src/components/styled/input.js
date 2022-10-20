import styled from "styled-components";
import { Inter_14_400 } from "../../styles/text";

const Input = styled.input`
  padding: 12px 16px;
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBox};
  border-radius: 8px;

  ::placeholder {
    color: ${(props) => props.theme.fontTertiary};
  }

  ${Inter_14_400};
  color: ${(props) => props.theme.fontPrimary};
`;

export default Input;
