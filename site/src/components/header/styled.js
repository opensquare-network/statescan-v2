import styled, { css } from "styled-components";
import { bg_theme, rounded_8 } from "../../styles/tailwindcss";
import { Inter_14_600 } from "../../styles/text";
import { mobilecss } from "@osn/common";
import CaretDownIcon from "../icons/caretDownIcon";

export const HeaderMenuItem = styled.div`
  ${Inter_14_600};
  cursor: pointer;
  text-decoration: none;
  padding: 8px 12px;

  &:hover {
    ${bg_theme("fillBase")};
    ${rounded_8};
  }
`;

export const Dropdown = styled.div`
  box-sizing: border-box;
  height: 36px;
  width: 160px;
  ${mobilecss(css`
    width: 100%;
  `)}
  background: ${({ theme }) => theme.fillPanel};
  border: 1px solid ${({ theme }) => theme.strokeBox};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  :hover {
    border-color: ${(p) => p.theme.theme500};
  }

  ${(p) =>
    p.active &&
    css`
      border-color: ${(p) => p.theme.theme500};
      outline: none;
      box-shadow: 0 0 0 2px ${(p) => p.theme.theme100};
    `}
`;

export const ArrowDownIcon = styled(CaretDownIcon)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 6px;
`;
