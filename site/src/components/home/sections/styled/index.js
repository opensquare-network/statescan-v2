import styled, { css } from "styled-components";
import {
  border_theme,
  flex,
  flex_1,
  flex_col,
  gap_x,
  justify_between,
  max_w_full,
  no_underline,
  p_t,
  text_tertiary,
} from "../../../../styles/tailwindcss";
import { mdcss, mobilecss } from "../../../../styles/responsive";
import { Panel } from "../../../styled/panel";
import { Inter_14_500, Inter_18_700 } from "../../../../styles/text";
import { FlexEnd } from "../../../styled/flex";
import Link from "../../../styled/link";

export const Section = styled.div`
  ${flex};
  ${flex_col};
  ${flex_1};

  ${mobilecss(css`
    margin-top: 32px;
  `)}
`;

export const SectionsWrapper = styled.div`
  ${flex};
  ${gap_x(24)};

  ${Section} {
    max-width: calc(50% - 12px);
    ${mdcss(max_w_full)};
  }

  ${mdcss(css`
    display: block;
  `)}
`;

export const StyledPanel = styled(Panel)`
  min-height: 422px;
  ${p_t(8)};
  ${flex};
  ${flex_col};
  ${justify_between};

  .loading {
    padding: 0;
    height: calc(100% - 52px);
  }

  ${mdcss(css`
    max-width: 100%;
  `)}
`;

export const Title = styled.h2`
  ${Inter_18_700};
  color: ${(props) => props.theme.fontPrimary};
`;

export const AnchorWrapper = styled(FlexEnd)`
  padding-right: 24px;
  height: 52px;
  border-top: 1px solid;
  ${border_theme("strokeBase")};
  ${Inter_14_500};
  ${text_tertiary};

  a {
    width: fit-content;
    text-align: right;
    color: ${(props) => props.theme.theme500};
    ${no_underline};

    ${(p) =>
      p.disabled &&
      css`
        pointer-events: none;
        ${text_tertiary};
      `}
  }
`;

export const Anchor = styled(Link)``;
