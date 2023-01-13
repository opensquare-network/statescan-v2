import styled from "styled-components";
import { Inter_12_600 } from "../../styles/text";

export const Tag = styled.span`
  padding: 2px 6px;
  ${Inter_12_600};
  color: ${(p) => p.theme.fontSecondary};
  background-color: ${(p) => p.theme.fillBase};
  border-radius: 4px;
`;

export const TagThemed = styled(Tag)`
  background: ${({ theme }) => theme.theme100};
  color: ${({ theme }) => theme.theme500};
`;

export const TagHighContrast = styled(Tag)`
  background: ${({ theme }) => theme.theme500};
  color: ${({ theme }) => theme.fontPrimaryInverse};
`;

const StatusTag = styled(Tag)`
  color: ${(p) => p.theme.fontPrimaryInverse};
`;

export const StatusPositiveTag = styled(StatusTag)`
  background-color: ${(p) => p.theme.fillPositive};
`;

export const StatusNegativeTag = styled(StatusTag)`
  background-color: ${(p) => p.theme.fillNegative};
`;
