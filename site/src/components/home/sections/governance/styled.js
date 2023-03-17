import styled from "styled-components";
import {
  no_underline,
  text_primary,
  text_tertiary,
  underline,
} from "../../../../styles/tailwindcss";

export const Tertiary = styled.span`
  ${text_tertiary};

  a {
    color: inherit;
    ${no_underline};

    &:hover {
      ${underline};
      ${text_primary};
    }
  }
`;
