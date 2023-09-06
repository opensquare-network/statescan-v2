import styled from "styled-components";
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
  box-shadow: 0px 0px 0px 2px rgba(55, 101, 220, 0.1);
`;

export default function NodeSelect() {
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setShowDropDown(false);
  });

  const currentNode = useCurrentNode();
  const SignalIcon = useSignalIcon(currentNode?.delay);

  return (
    <Wrapper ref={ref} onClick={() => setShowDropDown(!showDropDown)}>
      <SignalIcon width={20} height={20} />
      {showDropDown && (
        <DropDownContentWrapper>
          <NodeList />
        </DropDownContentWrapper>
      )}
    </Wrapper>
  );
}
