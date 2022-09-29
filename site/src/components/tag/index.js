import styled from "styled-components";
import { Inter_12_600 } from "../../styles/text";

export const Tag = styled.span`
  padding: 2px 6px;
  ${Inter_12_600};
  background: ${({ theme }) => theme.theme100};
  color: ${({ theme }) => theme.theme500};
  border-radius: 4px;
`;

export const TagHighContrast = styled(Tag)`
  background: ${({ theme }) => theme.theme500};
  color: ${({ theme }) => theme.fontPrimaryInverse};
`;
