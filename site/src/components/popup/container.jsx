import styled from "styled-components";
import { forwardRef } from "react";

const Container = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;
  overscroll-behavior-y: none;
`;

/**
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 */
function PopupContainer(props, ref) {
  return <Container {...props} ref={ref} />;
}

export default forwardRef(PopupContainer);
