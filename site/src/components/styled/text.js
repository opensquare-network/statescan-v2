import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";

export const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

export const TextTertiary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontTertiary};
`;
