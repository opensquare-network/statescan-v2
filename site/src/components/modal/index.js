import noop from "lodash.noop";
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { pretty_scroll_bar } from "../../styles";
import { smcss } from "../../styles/responsive";
import {
  absolute,
  fixed,
  flex,
  flex_col,
  h_full,
  inset_0,
  items_center,
  m_16,
  m_x_auto,
  overflow_auto,
  p_24,
  rounded_4,
  w,
  w_full,
  z_50,
} from "../../styles/tailwindcss";
import { useScrollLock } from "../../utils/hooks/useScrollLock";
import { Panel } from "../styled/panel";

const Wrapper = styled.div`
  ${fixed};
  ${inset_0};
  ${z_50};
  ${flex};
  ${flex_col};
  ${items_center};
  ${overflow_auto};
  ${w_full};
  ${h_full};
  ${pretty_scroll_bar};
  background-color: rgba(0, 0, 0, 0.85);

  ${smcss(m_16)}
`;

const ModalWrapper = styled(Panel)`
  ${absolute};
  ${overflow_auto};
  ${w(540)};
  ${rounded_4};
  ${m_16};
  ${m_x_auto};
  ${p_24};

  ${smcss(css`
    max-width: 80%;
  `)}
`;

export default function Modal({ children, open, onClose = noop }) {
  const [, setIsLock] = useScrollLock();
  useEffect(() => setIsLock(open), [open, setIsLock]);

  if (!open) {
    return null;
  }

  return (
    <Wrapper onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWrapper>
    </Wrapper>
  );
}
