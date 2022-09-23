import styled from "styled-components";

export const Panel = styled.div`
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBase};
  box-shadow: ${(p) => p.theme.shadowPanel};
  border-radius: 8px;
  overflow: hidden;
`;
