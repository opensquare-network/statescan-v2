import styled from "styled-components";
import { bg_theme, rounded_8 } from "../../styles/tailwindcss";
import { Inter_14_600 } from "../../styles/text";

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
