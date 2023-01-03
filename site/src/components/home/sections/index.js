import { FlexBetween, FlexColumn, FlexEnd } from "../../styled/flex";
import LatestBlocks from "./latestBlocks";
import React from "react";
import styled, { css } from "styled-components";
import { Inter_14_500, Inter_18_700 } from "../../../styles/text";
import Link from "../../styled/link";
import { Panel, StyledPanelTableWrapper } from "../../styled/panel";
import { useSelector } from "react-redux";
import {
  latestBlocksSelector,
  latestSignedTransfersSelector,
} from "../../../store/reducers/socketSlice";
import LatestTransfers from "./latestTransfers";
import { mobilecss } from "../../../styles/responsive";
import { mdcss } from "../../../styles/responsive";
import Assets from "./assets";

const Title = styled.h2`
  ${Inter_18_700};
  color: ${(props) => props.theme.fontPrimary};
`;

const Anchor = styled(Link)`
  width: fit-content;
  ${Inter_14_500};
  text-align: right;
  color: ${(props) => props.theme.theme500};
`;

const StyledPanel = styled(Panel)`
  max-width: 644px;

  ${mdcss(css`
    max-width: 100%;
  `)}
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${mobilecss(css`
    margin-top: 32px;
  `)}
`;

const SectionsWrapper = styled(FlexBetween)`
  align-items: unset;

  ${mdcss(css`
    display: block;
  `)}
`;

const AnchorWrapper = styled(FlexEnd)`
  padding-right: 24px;
  height: 52px;
`;

export default function Sections() {
  const blocks = useSelector(latestBlocksSelector);
  const transfers = useSelector(latestSignedTransfersSelector);

  return (
    <FlexColumn gap={32}>
      <SectionsWrapper gap={24}>
        <Section>
          <Title>Latest Blocks</Title>
          <StyledPanel>
            <LatestBlocks blocks={blocks} />
            <AnchorWrapper>
              <Anchor to={"/blocks"}>View All</Anchor>
            </AnchorWrapper>
          </StyledPanel>
        </Section>

        <Section>
          <Title>Signed Transfers</Title>
          <StyledPanel>
            <LatestTransfers transfers={transfers} />
            <AnchorWrapper>
              <Anchor to={"/transfers"}>View All</Anchor>
            </AnchorWrapper>
          </StyledPanel>
        </Section>
      </SectionsWrapper>

      <Section>
        <Title>Assets</Title>
        <StyledPanelTableWrapper>
          <Assets />
          <AnchorWrapper>
            <Anchor to="/assets">View All</Anchor>
          </AnchorWrapper>
        </StyledPanelTableWrapper>
      </Section>
    </FlexColumn>
  );
}
