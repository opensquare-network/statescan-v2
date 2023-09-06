import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  chainSelector,
  modeSelector,
} from "../../../store/reducers/settingSlice";
import { Inter_14_600 } from "../../../styles/text";
import { mobilecss } from "../../../styles/responsive";
import CaretDownIcon from "../../icons/caretDownIcon";
import { useOnClickOutside } from "@osn/common";
import NodesDropDown from "../../nodeSelect/dropDown";
import {
  currentNodeSelector,
  nodesSelector,
  setCurrentNode,
} from "../../../store/reducers/nodeSlice";
import { getDelayType } from "../../nodeSelect/utils";
import { DarkSignalIcons, LightSignalIcons } from "../../nodeSelect/signalIcon";

const ArrowDownIcon = styled(CaretDownIcon)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 6px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Dropdown = styled.div`
  box-sizing: border-box;
  height: 36px;
  width: 160px;
  ${mobilecss(css`
    width: 100%;
  `)}
  background: ${({ theme }) => theme.fillPanel};
  border: 1px solid ${({ theme }) => theme.strokeBox};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  :hover {
    border-color: ${(p) => p.theme.theme500};
  }

  ${(p) =>
    p.active &&
    css`
      border-color: ${(p) => p.theme.theme500};
      outline: none;
      box-shadow: 0 0 0 2px ${(p) => p.theme.theme100};
    `}
`;

const Text = styled.div`
  color: ${({ theme }) => theme.fontPrimary};
  ${Inter_14_600};
`;

export default function NodeSwitch() {
  const dispatch = useDispatch();
  const chain = useSelector(chainSelector);
  const nodesSetting = useSelector(nodesSelector);
  const currentNodeSetting = useSelector(currentNodeSelector);
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setShowDropDown(false);
  });

  const nodes = nodesSetting?.[chain] || [];
  const currentNetwork = nodes?.find(
    (item) => item.url === currentNodeSetting?.[chain],
  );

  const themeMode = useSelector(modeSelector);
  const SignalIcons =
    themeMode === "light" ? LightSignalIcons : DarkSignalIcons;
  const delayType = getDelayType(currentNetwork?.delay);
  const SignalIcon = SignalIcons[delayType];

  return (
    <Wrapper ref={ref} onClick={() => setShowDropDown(!showDropDown)}>
      <Dropdown active={showDropDown}>
        <SignalIcon width={20} height={20} />
        <Text>{currentNetwork.name}</Text>
        <ArrowDownIcon />
      </Dropdown>

      {showDropDown && (
        <NodesDropDown
          nodes={nodes}
          selectedItem={currentNetwork}
          setSelectedItem={(selectedItem) => {
            if (selectedItem && selectedItem.url === currentNetwork?.url) {
              return;
            }
            dispatch(
              setCurrentNode({
                chain,
                url: selectedItem.url,
              }),
            );
          }}
        />
      )}
    </Wrapper>
  );
}
