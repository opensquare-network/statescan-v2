import styled from "styled-components";

export const Text = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.fontSecondary};
`;

export const BoldText = styled(Text)`
  font-weight: 500;
`;

export const BreakText = styled(Text)`
  word-break: break-all;
`;
