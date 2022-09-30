import { FlexBetween } from "../../styled/flex";
import LatestBlocks from "./latestBlocks";
import React from "react";
import styled from "styled-components";
import { Inter_14_500, Inter_18_700 } from "../../../styles/text";
import Link from "../../styled/link";
import { Panel } from "../../styled/panel";
import { useSelector } from "react-redux";
import {
  latestBlocksSelector,
  latestSignedTransfersSelector,
} from "../../../store/reducers/socketSlice";
import LatestTransfers from "./latestTransfers";

const Title = styled.h2`
  ${Inter_18_700};
  color: ${(props) => props.theme.fontPrimary};
`;

const Anchor = styled(Link)`
  display: block;
  padding-right: 24px;
  ${Inter_14_500};
  line-height: 52px;
  text-align: right;
  color: ${(props) => props.theme.theme500};
`;

const StyledPanel = styled(Panel)`
  max-width: 644px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SectionsWrapper = styled(FlexBetween)`
  align-items: unset;
`;

export default function Sections() {
  const blocks = useSelector(latestBlocksSelector);
  const transfers = useSelector(latestSignedTransfersSelector);

  return (
    <SectionsWrapper gap={24}>
      <Section>
        <Title>Latest Blocks</Title>
        <StyledPanel>
          <LatestBlocks blocks={blocks} />
          <Anchor to={"/blocks"}>View All</Anchor>
        </StyledPanel>
      </Section>

      <Section>
        <Title>Latest Transfers</Title>
        <StyledPanel>
          <LatestTransfers transfers={transfers} />
          <Anchor to={"/transfers"}>View All</Anchor>
        </StyledPanel>
      </Section>
    </SectionsWrapper>
  );
}
