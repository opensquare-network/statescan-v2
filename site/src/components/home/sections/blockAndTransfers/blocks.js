import { useSelector } from "react-redux";
import {
  latestBlocksLoadingSelector,
  latestBlocksSelector,
} from "../../../../store/reducers/socketSlice";
import { Anchor, AnchorWrapper, Section, StyledPanel, Title } from "../styled";
import React from "react";
import LatestBlocks from "../latestBlocks";
import { getIsSimpleMode } from "../../../../utils/env";
import styled from "styled-components";
import { Inter_14_500 } from "../../../../styles/text";

const SimpleModeHint = styled.div`
  display: flex;
  flex-grow: 1;
  ${Inter_14_500};
  color: ${(props) => props.theme.fontSecondary};
`;

export default function Blocks() {
  const blocks = useSelector(latestBlocksSelector);
  const blocksLoading = useSelector(latestBlocksLoadingSelector);
  const isSimpleMode = getIsSimpleMode();

  return (
    <Section>
      <Title>Latest Blocks</Title>
      <StyledPanel>
        <LatestBlocks blocks={blocks} loading={blocksLoading} />
        <AnchorWrapper
          disabled={isSimpleMode || !blocks.length || blocksLoading}
        >
          <SimpleModeHint>*Currently in simple mode</SimpleModeHint>
          <Anchor to={"/blocks"}>View All</Anchor>
        </AnchorWrapper>
      </StyledPanel>
    </Section>
  );
}
