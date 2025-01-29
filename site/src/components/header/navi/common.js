import styled, { css } from "styled-components";
import { Inter_14_600 } from "../../../styles/text";

const MenuLabel = styled.div`
  margin-top: 24px;
  ${Inter_14_600};
  color: ${(p) => p.theme.fontTertiary};
  text-align: center;
`;

export const MenuItem = styled(MenuLabel)`
  margin-top: 16px;
  cursor: pointer;
  color: ${(p) => p.theme.fontPrimary};
  ${(p) =>
    p.selected &&
    css`
      background: ${(p) => p.theme.fillPopupHover};
    `}
  ${(p) =>
    p.disabled &&
    css`
      background: ${(p) => p.theme.fillPanel};
      cursor: not-allowed;
      pointer-events: none;
    `}
`;
