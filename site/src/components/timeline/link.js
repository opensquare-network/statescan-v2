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
    <MyLink to={to} target="_blank">
      <Wrapper>
        <div>{name}</div>
        <CaretUprightIcon />
      </Wrapper>
    </MyLink>
  );
}

function SubscanLink({ domain, indexer }) {
  const { blockHeight, extrinsicIndex, eventIndex } = indexer;

  return (
    <Links>
      {isNil(extrinsicIndex) && isNil(eventIndex) && (
        <Link name="Block" to={`${domain}/block/${blockHeight}`} />
      )}
      {!isNil(eventIndex) && (
        <Link
          name="Event"
          to={`${domain}/block/${blockHeight}?tab=event&event=${indexer.blockHeight}-${indexer.eventIndex}`}
        />
      )}
      {!isNil(extrinsicIndex) && (
        <Link
          name="Extrinsic"
          to={`${domain}/extrinsic/${indexer.blockHeight}-${indexer.extrinsicIndex}`}
        />
      )}
    </Links>
  );
}

export default function IndexerLinks({ indexer }) {
  const { blockHeight, extrinsicIndex, eventIndex, chain } = indexer;
  if (isNil(blockHeight) && isNil(extrinsicIndex) && isNil(eventIndex)) {
    return null;
  }

  if (chain === "people" && process.env.REACT_APP_PUBLIC_CHAIN === "polkadot") {
    return (
      <SubscanLink
        domain="https://people-polkadot.subscan.io"
        indexer={indexer}
      />
    );
  }

  let domain = null;
  if (chain === "people" && process.env.REACT_APP_PUBLIC_CHAIN === "kusama") {
    domain = "https://people-kusama.statescan.io/#";
  }

  return (
    <Links>
      {isNil(extrinsicIndex) && isNil(eventIndex) && (
        <Link name="Block" to={`${domain || ""}/blocks/${blockHeight}`} />
      )}
      {!isNil(extrinsicIndex) && (
        <Link
          name="Extrinsic"
          to={`${domain || ""}/extrinsics/${indexer.blockHeight}-${
            indexer.extrinsicIndex
          }`}
        />
      )}
      {!isNil(eventIndex) && (
        <Link
          name="Event"
          to={`${domain || ""}/events/${indexer.blockHeight}-${
            indexer.eventIndex
          }`}
        />
      )}
    </Links>
  );
}
