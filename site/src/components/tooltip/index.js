import { useCallback, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import {
  TooltipProvider,
  useSetShowTip,
  useSetTipContent,
  useSetTipPosition,
} from "./context";

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: auto;
  ${(p) =>
    p.pullRight
      ? css`
          margin-right: 0;
        `
      : css`
          margin-left: 0;
        `}
`;

export default function Tooltip({
  children,
  tip = "",
  pullRight = false,
  disabled = false,
  ...restProps
}) {
  const ref = useRef();
  const setShowTip = useSetShowTip();
  const setTipContent = useSetTipContent();
  const setTipPosition = useSetTipPosition();

  useEffect(() => {
    return () => {
      setShowTip(false);
    };
  }, [setShowTip]);

  const showTip = useCallback(() => {
    if (!tip || disabled) {
      return;
    }
    const position = ref.current.getBoundingClientRect();
    setShowTip(true);
    setTipContent(tip);
    setTipPosition({
      left: position.left + position.width / 2,
      bottom: window.innerHeight - position.top + 12,
    });
  }, [setShowTip, setTipContent, setTipPosition, ref, tip, disabled]);

  const hideTip = useCallback(() => {
    setShowTip(false);
  }, [setShowTip]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("mouseover", showTip);
      element.addEventListener("mouseout", hideTip);
    }
    return () => {
      if (element) {
        element.removeEventListener("mouseover", showTip);
        element.removeEventListener("mouseout", hideTip);
      }
    };
  }, [ref, showTip, hideTip]);

  return (
    <Wrapper ref={ref} pullRight={pullRight} {...restProps}>
      {children}
    </Wrapper>
  );
}

export { TooltipProvider };
