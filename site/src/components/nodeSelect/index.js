import styled from "styled-components";
import { ReactComponent as SignalFastDarkSVG } from "./icons/node-signal-fast-dark.svg";
import { ReactComponent as SignalFastSVG } from "./icons/node-signal-fast.svg";
import { ReactComponent as SignalMediumDarkSVG } from "./icons/node-signal-medium-dark.svg";
import { ReactComponent as SignalMediumSVG } from "./icons/node-signal-medium.svg";
import { ReactComponent as SignalSlowDarkSVG } from "./icons/node-signal-slow-dark.svg";
import { ReactComponent as SignalSlowSVG } from "./icons/node-signal-slow.svg";
import { ReactComponent as SignalUnavailableDarkSVG } from "./icons/node-signal-unavailable-dark.svg";
import { ReactComponent as SignalUnavailableSVG } from "./icons/node-signal-unavailable.svg";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@osn/common";
import DropDown from "./dropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  currentNodeSelector,
  nodesSelector,
  setCurrentNode,
} from "../../store/reducers/nodeSlice";
import { chainSelector, modeSelector } from "../../store/reducers/settingSlice";
import useUpdateNodesDelay from "../../utils/hooks/useUpdateNodesDelay";
import { getDelayType } from "./utils";

const DarkSignalIcons = {
  Fast: SignalFastDarkSVG,
  Medium: SignalMediumDarkSVG,
  Slow: SignalSlowDarkSVG,
  Unavailable: SignalUnavailableDarkSVG,
};

const LightSignalIcons = {
  Fast: SignalFastSVG,
  Medium: SignalMediumSVG,
  Slow: SignalSlowSVG,
  Unavailable: SignalUnavailableSVG,
};

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
  useUpdateNodesDelay();

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
      <SignalIcon width={20} height={20} />
      {showDropDown && (
        <DropDown
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
