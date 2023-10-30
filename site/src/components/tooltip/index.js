import { useRef } from "react";
import styled from "styled-components";
import {
  useFloating,
  flip,
  shift,
  arrow,
  offset,
  autoUpdate,
} from "@floating-ui/react";
import { useState } from "react";
import { Overpass_Mono_12_500 } from "../../styles/text";

const arrowWidth = 6;

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: auto;
`;

const TipArrow = styled.div`
  position: absolute;
  border: ${arrowWidth}px solid transparent;
  border-top-color: var(--fillTooltip);
  left: ${(p) => p.x ?? 0}px;
`;
const TipWrapper = styled.div`
  padding: 8px 12px;
  background-color: var(--fillTooltip);
  color: var(--fontPrimaryInverse);
  border-radius: 4px;
  ${Overpass_Mono_12_500};
  z-index: 100000;

  display: none;

  &[data-show="true"] {
    display: block;
  }

  &[data-placement^="top"] > ${TipArrow} {
    bottom: -${arrowWidth * 2}px;
  }

  &[data-placement^="bottom"] > ${TipArrow} {
    top: -${arrowWidth * 2}px;
    transform: rotate(180deg);
  }
`;

export default function Tooltip({
  children,
  tip = "",
  pullRight = false,
  disabled = false,
  tipOffset = 12,
  ...restProps
}) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);

  const { middlewareData, placement, refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    middleware: [
      offset(tipOffset),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  function show() {
    setOpen(true);
  }

  function hide() {
    setOpen(false);
  }

  return (
    <div>
      <Wrapper
        ref={refs.setReference}
        pullRight={pullRight}
        {...restProps}
        onMouseEnter={show}
        onFocus={show}
        onMouseLeave={hide}
        onBlur={hide}
        style={{
          marginLeft: !pullRight ? 0 : undefined,
          marginRight: pullRight ? 0 : undefined,
          ...restProps.style,
        }}
      >
        {children}
      </Wrapper>
      {open && tip && (
        <TipWrapper
          ref={refs.setFloating}
          data-show={open}
          data-placement={placement}
          style={floatingStyles}
        >
          {tip}
          <TipArrow x={middlewareData?.arrow?.x} ref={arrowRef} />
        </TipWrapper>
      )}
    </div>
  );
}
