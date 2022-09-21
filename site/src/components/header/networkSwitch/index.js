import { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Polkadot } from "../../icons/polkadot.svg";
import { ReactComponent as Kusama } from "../../icons/kusama.svg";
import { ReactComponent as Westend } from "../../icons/westend.svg";
import { ReactComponent as ArrowDown } from "../../icons/caret-down.svg";
import { useOnClickOutside } from "../../../utils/hooks";
import { nodes } from "../../../utils/constants";
import { Flex } from "../../styled/flex";

const ArrowDownIcon = styled(ArrowDown)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 6px;

  path {
    stroke: ${({ theme }) => theme.fontPrimary};
  }
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 9;
`;

const Dropdown = styled.div`
  box-sizing: border-box;
  height: 36px;
  width: 160px;
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
    border-color: ${({ theme }) => theme.strokeBoxSelected};
  }

  ${(p) =>
    p.active &&
    css`
      border-color: ${({ theme }) => theme.strokeBoxSelected};
    `}
`;

const Text = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: ${({ theme }) => theme.fontPrimary};
`;

const Sub = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.fontTertiary};
`;

const Options = styled.div`
  background: ${({ theme }) => theme.fillPopup};
  padding: 8px 0;
  width: 222px;
  position: absolute;
  top: 44px;
  right: 0;
`;

const Item = styled.a`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.fillPopupHover};
  }

  ${(p) =>
    p.active &&
    css`
      background: ${({ theme }) => theme.fillPopupHover};
    `}
`;

const ChainIconMap = new Map([
  ["polkadot", <Polkadot />],
  ["kusama", <Kusama />],
  ["westend", <Westend />],
]);

export default function ChainSwitcher() {
  const chain = process.env.REACT_APP_PUBLIC_CHAIN;
  const currentNode = nodes.find((item) => item.value === chain);
  const [show, setShow] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  return (
    <Wrapper ref={ref}>
      <Dropdown active={show} onClick={() => setShow((state) => !state)}>
        {currentNode && (
          <>
            {ChainIconMap.get(currentNode.chainIcon)}
            <Text>{currentNode.name}</Text>
          </>
        )}
        <ArrowDownIcon />
      </Dropdown>
      {show && (
        <Options>
          {nodes
            .filter((item) => !item?.hidden)
            .map((item, index) => (
              <Item
                key={index}
                active={item.value === currentNode?.value}
                onClick={() => {
                  if (item.value === currentNode?.value) {
                    window.location.href = "/";
                  } else {
                    window.open(`https://${item.value}.statescan.io`, "_blank");
                  }
                }}
              >
                <Flex style={{ gap: 8 }}>
                  {ChainIconMap.get(item.chainIcon)}
                  <Text>{item.name}</Text>
                </Flex>
                <Sub>{item.sub}</Sub>
              </Item>
            ))}
        </Options>
      )}
    </Wrapper>
  );
}
