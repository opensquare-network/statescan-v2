import { useState, useRef } from "react";
import styled, { css } from "styled-components";

import { useOnClickOutside } from "utils/hooks";
import { nodes } from "../../../utils/constants";
import { card_border } from "styles/textStyles";
import { Flex } from "../../styled/flex";

const Wrapper = styled.div`
  position: relative;
  z-index: 9;
`;

const Dropdown = styled.div`
  height: 36px;
  width: 156px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  :hover {
    border-color: #bbbbbb;
  }
  ${(p) =>
    p.active &&
    css`
      border-color: #bbbbbb;
    `}
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Text = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #111111;
`;

const Sub = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: rgba(17, 17, 17, 0.35);
`;

const ArrowDown = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 6px;
`;

const Options = styled.div`
  background: #ffffff;
  ${card_border};
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
    background: #fafafa;
  }
  ${(p) =>
    p.active &&
    css`
      background: #fafafa;
    `}
`;

export default function NetworkSwitcher({ node }) {
  const currentNode = nodes.find((item) => item.value === node);
  const [show, setShow] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  return (
    <Wrapper ref={ref}>
      <Dropdown active={show} onClick={() => setShow((state) => !state)}>
        {currentNode && (
          <>
            <Icon src={currentNode.icon} alt={currentNode.value} />
            <Text>{currentNode.name}</Text>
          </>
        )}
        <ArrowDown src="/imgs/icons/arrow-down.svg" />
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
                    location.href = "/";
                  } else {
                    window.open(`https://${item.value}.statescan.io`, "_blank");
                  }
                }}
              >
                <Flex>
                  <Icon src={item.icon} alt={item.value} />
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
