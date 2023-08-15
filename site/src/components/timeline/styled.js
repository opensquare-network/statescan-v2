import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";

export const Text = styled.div`
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_500};
`;

export const BoldText = styled(Text)`
  font-weight: 500;
`;

export const BreakText = styled(Text)`
  word-break: break-all;
`;
