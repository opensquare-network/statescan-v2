import styled from "styled-components";
import {
  bg_fill_panel,
  border,
  inline_flex,
  p_x,
  p_y,
  text_primary,
  theme,
} from "../../../styles/tailwindcss";
import { Inter_14_600 } from "../../../styles/text";

export const Button = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background: ${(p) => p.theme.fillButton};
  color: ${(p) => p.theme.fontPrimaryInverse};
  border-radius: 8px;
  cursor: pointer;
  ${Inter_14_600};
`;

export const PanelButton = styled(Button)`
  ${inline_flex};
  ${text_primary};
  ${bg_fill_panel};
  ${border};
  ${p_x(15)};
  ${p_y(11)};
  border-color: ${theme("strokeBox")};
`;
