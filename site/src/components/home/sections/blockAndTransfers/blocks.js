import { useSelector } from "react-redux";
import {
  latestBlocksLoadingSelector,
  latestBlocksSelector,
} from "../../../../store/reducers/socketSlice";
import { Anchor, AnchorWrapper, Section, StyledPanel, Title } from "../styled";
import React from "react";
import LatestBlocks from "../latestBlocks";

export default function Blocks() {
  const blocks = useSelector(latestBlocksSelector);
  const blocksLoading = useSelector(latestBlocksLoadingSelector);
  return (
    <Section>
      <Title>Latest Blocks</Title>
      <StyledPanel>
        <LatestBlocks blocks={blocks} loading={blocksLoading} />
        <AnchorWrapper>
          <Anchor disabled={!blocks.length || blocksLoading} to={"/blocks"}>
            View All
          </Anchor>
        </AnchorWrapper>
      </StyledPanel>
    </Section>
  );
}
