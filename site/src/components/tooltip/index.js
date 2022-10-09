import {
  setPosition,
  setText,
  toggleTooltip,
} from "../../store/reducers/tooltipSlice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

export default function Tooltip({ children, tip = "" }) {
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseover", () => {
        const position = ref.current.getBoundingClientRect();
        dispatch(toggleTooltip(true));
        dispatch(setText(tip));
        dispatch(
          setPosition({
            left: position.left + position.width / 2,
            top: position.top - position.height - 24,
          }),
        );
      });
      ref.current.addEventListener("mouseout", () => {
        dispatch(toggleTooltip(false));
      });
    }
  }, []);

  return <Wrapper ref={ref}>{children}</Wrapper>;
}
