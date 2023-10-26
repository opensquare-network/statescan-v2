import styled, { css } from "styled-components";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@osn/common";
import NodeList from "./nodeList";
import { DropDownContentWrapper } from "./styled";
import useCurrentNode from "./useCurrentNode";
import useSignalIcon from "./useSignalIcon";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--strokeBox);
  :hover {
    border: 1px solid var(--theme500);
  }

  background: var(--fillPanel);

  ${(p) =>
    p.active &&
    css`
      box-shadow: 0px 0px 0px 2px var(--theme100);
      border: 1px solid var(--theme500);
    `}
`;

export default function NodeSwitch() {
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setShowDropDown(false);
  });

  const currentNode = useCurrentNode();
  const signalIcon = useSignalIcon(currentNode?.delay);

  return (
    <Wrapper
      ref={ref}
      active={showDropDown}
      onClick={() => setShowDropDown(!showDropDown)}
    >
      {signalIcon}
      {showDropDown && (
        <DropDownContentWrapper>
          <NodeList />
        </DropDownContentWrapper>
      )}
    </Wrapper>
  );
}
