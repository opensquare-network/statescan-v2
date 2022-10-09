import styled from "styled-components";
import { SF_Mono_12_500 } from "../../styles/text";
import { useSelector } from "react-redux";
import {
  tooltipPositionSelector,
  tooltipShowSelector,
} from "../../store/reducers/tooltipSlice";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: ${(p) => p?.position?.left ?? 0}px;
  top: ${(p) => p?.position?.top ?? 0}px;
`;

const TipWrapper = styled.div`
  padding: 8px 12px;
  display: ${(p) => (p.showTip ? "block" : "none")};
  background: ${(p) => p.theme.fillTooltip};
  color: ${(p) => p.theme.fontPrimaryInverse};
  ${SF_Mono_12_500};
  border-radius: 4px;
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${(p) => p.theme.fillTooltip};
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;

export default function Tip({ children }) {
  const ref = useRef();
  const show = useSelector(tooltipShowSelector);
  const position = useSelector(tooltipPositionSelector);
  const [rect, setRect] = useState({ width: 0 });

  useEffect(() => {
    if (ref.current) {
      setRect({ width: ref.current.getBoundingClientRect().width });
    }
  }, [position]);

  if (!show) {
    return null;
  }

  return (
    <Wrapper
      position={{ ...position, left: position.left - rect.width / 2 }}
      ref={ref}
    >
      <TipWrapper showTip>
        {children}
        <Triangle />
      </TipWrapper>
    </Wrapper>
  );
}
