import { useRef, useState } from "react";
import styled from "styled-components";
import { Inter_14_600 } from "../../../styles/text";
import { useOnClickOutside } from "@osn/common";
import NodeList from "../../nodeSelect/nodeList";
import { DropDownContentWrapper } from "../../nodeSelect/styled";
import useSignalIcon from "../../nodeSelect/useSignalIcon";
import { ArrowDownIcon, Dropdown } from "../styled";
import useCurrentNode from "../../nodeSelect/useCurrentNode";

const NodeDropDownContentWrapper = styled(DropDownContentWrapper)`
  width: unset;
  left: 0;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.fontPrimary};
  ${Inter_14_600};
`;

export default function MobileNodeSwitch() {
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setShowDropDown(false);
  });

  const currentNode = useCurrentNode();
  const SignalIcon = useSignalIcon(currentNode?.delay);

  return (
    <Wrapper ref={ref} onClick={() => setShowDropDown(!showDropDown)}>
      <Dropdown active={showDropDown}>
        <SignalIcon width={20} height={20} />
        <Text>{currentNode.name}</Text>
        <ArrowDownIcon />
      </Dropdown>

      {showDropDown && (
        <NodeDropDownContentWrapper>
          <NodeList />
        </NodeDropDownContentWrapper>
      )}
    </Wrapper>
  );
}
