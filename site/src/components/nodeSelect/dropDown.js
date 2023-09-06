import isNil from "lodash.isnil";
import styled, { css } from "styled-components";
import { getDelayType } from "./utils";

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 999;

  width: 320px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  display: flex;
  padding: 8px 0px;
  flex-direction: column;

  border-radius: 8px;
  border: 1px solid var(--strokeBase);
  background: var(--fillPopup);
  box-shadow: 0px 0.5px 1px 0px rgba(27, 32, 44, 0.02),
    0px 2px 4px 0px rgba(27, 32, 44, 0.03),
    0px 6px 16px 0px rgba(27, 32, 44, 0.05);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  align-items: baseline;
  gap: 8px;
  color: var(--fontPrimary);
  :hover {
    background: var(--fillPopupHover);
  }

  ${(p) =>
    p.active &&
    css`
      color: var(--theme500);
    `}

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const Delay = styled.span`
  color: var(--fontTertiary);
  ${(p) =>
    p.delay === "Fast" &&
    css`
      color: var(--fontPositive);
    `}
  ${(p) =>
    p.delay === "Medium" &&
    css`
      color: var(--fontPending);
    `}
  ${(p) =>
    p.delay === "Slow" &&
    css`
      color: var(--fontNegative);
    `}
`;

export default function DropDown({ nodes, selectedItem, setSelectedItem }) {
  return (
    <Wrapper>
      {nodes.map((node) => {
        const delay = getDelayType(node.delay);
        return (
          <Item
            key={node.url}
            active={node === selectedItem}
            onClick={() => setSelectedItem(node)}
          >
            <span>Hosted by {node.name}</span>
            {!isNil(node.delay) && !isNaN(node.delay) && (
              <Delay delay={delay}>{node.delay} ms</Delay>
            )}
          </Item>
        );
      })}
    </Wrapper>
  );
}
