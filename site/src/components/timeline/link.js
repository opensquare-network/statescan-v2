import styled from "styled-components";
import { Inter_12_400 } from "../../styles/text";
import { Flex } from "../styled/flex";
import { Link as RouteLink } from "react-router-dom";
import CaretUprightIcon from "../icons/caretUpright";
import isNil from "lodash.isnil";

const Wrapper = styled(Flex)`
  cursor: pointer;
  ${Inter_12_400}
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${(p) => p.theme.fillAlpha};
  color: ${(p) => p.theme.fontSecondary};
  > :nth-child(2) {
    margin-left: 4px;
  }
  svg path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
  &:hover {
    color: ${(p) => p.theme.fontPrimary};
    svg path {
      stroke-opacity: 0.5;
    }
  }
`;

const MyLink = styled(RouteLink)`
  text-decoration: none;
`;

const Links = styled(Flex)`
  > :nth-child(1) {
    margin-right: 8px;
  }
`;

function Link({ name, to }) {
  return (
    <MyLink to={to}>
      <Wrapper>
        <div>{name}</div>
        <CaretUprightIcon />
      </Wrapper>
    </MyLink>
  );
}

export default function IndexerLinks({ indexer }) {
  const { blockHeight, extrinsicIndex, eventIndex } = indexer;

  if (isNil(blockHeight) && isNil(extrinsicIndex) && isNil(eventIndex)) {
    return null;
  }

  return (
    <Links>
      {isNil(extrinsicIndex) && isNil(eventIndex) && (
        <Link name="Block" to={`/blocks/${blockHeight}`} />
      )}
      {!isNil(extrinsicIndex) && (
        <Link
          name="Extrinsic"
          to={`/extrinsics/${indexer.blockHeight}-${indexer.extrinsicIndex}`}
        />
      )}
      {!isNil(eventIndex) && (
        <Link
          name="Event"
          to={`/events/${indexer.blockHeight}-${indexer.eventIndex}`}
        />
      )}
    </Links>
  );
}
