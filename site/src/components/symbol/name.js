import { useRef } from "react";
import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";
import useIsOverflow from "../../utils/hooks/useIsOverflow";
import Tooltip from "../tooltip";

const Name = styled.div`
  color: ${(p) => p.color};
  max-width: ${(p) => p.width};
  ${Inter_14_500};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default function SymbolName({
  name,
  color = "var(--fontPrimary)",
  width = "auto",
}) {
  const ref = useRef();
  const isEllipsis = useIsOverflow(ref);

  return (
    <Tooltip tip={name} disabled={!isEllipsis}>
      <Name ref={ref} color={color} width={width}>
        {name}
      </Name>
    </Tooltip>
  );
}
