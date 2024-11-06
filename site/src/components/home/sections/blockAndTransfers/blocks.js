import { Anchor, AnchorWrapper, Section, StyledPanel, Title } from "../styled";
import React from "react";
import LatestBlocks from "../latestBlocks";
import { getIsSimpleMode } from "../../../../utils/env";
import useLatestBlocks from "../../../../hooks/overview/useLatestBlocks";

export default function Blocks() {
  const { blocks, loading } = useLatestBlocks();
  const isSimpleMode = getIsSimpleMode();

  return (
    <Section>
      <Title>Latest Blocks</Title>
      <StyledPanel>
        <LatestBlocks blocks={blocks} loading={loading} />
        <AnchorWrapper disabled={isSimpleMode || !blocks.length || loading}>
          <Anchor to={"/blocks"}>View All</Anchor>
        </AnchorWrapper>
      </StyledPanel>
    </Section>
  );
}
