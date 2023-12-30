import isNil from "lodash.isnil";
import styled, { css } from "styled-components";
import { getDelayType } from "./utils";
import useCurrentNode from "./useCurrentNode";
import { useDispatch, useSelector } from "react-redux";
import { nodesSelector, setCurrentNode } from "../../store/reducers/nodeSlice";
import { Inter_14_500 } from "../../styles/text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  align-items: baseline;
  gap: 8px;
  color: var(--fontPrimary);
  :hover {
    background: var(--fillPopupHover);
  }

  ${(p) =>
    p.active &&
    css`
      background: var(--fillPopupHover);
    `}

  ${Inter_14_500}
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

export default function NodeList() {
  const dispatch = useDispatch();
  const nodes = useSelector(nodesSelector);
  const currentNode = useCurrentNode();

  const onSelectNode = (node) => {
    if (node && node.url === currentNode?.url) {
      return;
    }
    dispatch(
      setCurrentNode({
        url: node.url,
      }),
    );
  };

  return (
    <Wrapper>
      {(nodes || []).map((node) => {
        const delay = getDelayType(node.delay);
        return (
          <Item
            key={node.url}
            active={node.url === currentNode.url}
            onClick={() => onSelectNode(node)}
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
