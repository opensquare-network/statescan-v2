import isNil from "lodash.isnil";
import styled from "styled-components";
import ExternalLink from "../externalLink";
import CaretUprightIcon from "../icons/caretUpright";
import { Links } from "./link";
import { Wrapper } from "./link";

const TimelineExternalLinkWrapper = styled(ExternalLink)`
  text-decoration: none;
`;

function TimelineExternalLink({ name, href }) {
  return (
    <TimelineExternalLinkWrapper href={href}>
      <Wrapper>
        <div>{name}</div>
        <CaretUprightIcon />
      </Wrapper>
    </TimelineExternalLinkWrapper>
  );
}

export default function EtherscanLink({ indexer }) {
  const { blockHeight, extrinsicIndex, eventIndex } = indexer;

  return (
    <Links>
      {isNil(extrinsicIndex) && isNil(eventIndex) && (
        <TimelineExternalLink
          name="Block"
          href={`https://etherscan.io/block/${blockHeight}`}
        />
      )}
    </Links>
  );
}
