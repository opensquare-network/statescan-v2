import {
  setPosition,
  setText,
  toggleTooltip,
} from "../../store/reducers/tooltipSlice";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";

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
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(toggleTooltip(false));
    };
  }, [dispatch]);

  const showTip = useCallback(() => {
    if (!tip || disabled) {
      return;
    }
    const position = ref.current.getBoundingClientRect();
    dispatch(toggleTooltip(true));
    dispatch(setText(tip));
    dispatch(
      setPosition({
        left: position.left + position.width / 2,
        bottom: window.innerHeight - position.top + 12,
      }),
    );
  }, [dispatch, ref, tip, disabled]);

  const hideTip = useCallback(() => {
    dispatch(toggleTooltip(false));
  }, [dispatch]);

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
