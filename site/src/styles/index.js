import { css } from "styled-components";

export const no_scroll_bar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const pretty_scroll_bar = css`
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.grey400Border};
    border-radius: 4px;
  }
`;
