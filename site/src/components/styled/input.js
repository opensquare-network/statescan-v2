import styled from "styled-components";
import { Inter_14_400 } from "../../styles/text";

const TextInput = styled.input`
  padding: 12px 16px;
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBox};
  border-radius: 8px;

  ::placeholder {
    color: rgba(17, 17, 17, 0.35);
  }

  ${Inter_14_400};
  width: 100%;
  max-width: 529px;
`;

export default function Input(props) {
  return <TextInput {...props} />;
}
