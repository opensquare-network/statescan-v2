import { FlexBetween, FlexColumn, FlexEnd } from "../../styled/flex";
import LatestBlocks from "./latestBlocks";
import React from "react";
import styled, { css } from "styled-components";
import { Inter_14_500, Inter_18_700 } from "../../../styles/text";
import Link from "../../styled/link";
import { Panel, StyledPanelTableWrapper } from "../../styled/panel";
import { useSelector } from "react-redux";
import {
  latestBlocksLoadingSelector,
  latestBlocksSelector,
  latestSignedTransfersLoadingSelector,
  latestSignedTransfersSelector,
} from "../../../store/reducers/socketSlice";
import LatestTransfers from "./latestTransfers";
import { mobilecss } from "../../../styles/responsive";
import { mdcss } from "../../../styles/responsive";
import Assets from "./assets";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";

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
  const blocksLoading = useSelector(latestBlocksLoadingSelector);
  const transfers = useSelector(latestSignedTransfersSelector);
  const transfersLoading = useSelector(latestSignedTransfersLoadingSelector);
  const { modules } = useChainSettings();

  return (
    <FlexColumn gap={32}>
      <SectionsWrapper gap={24}>
        <Section>
          <Title>Latest Blocks</Title>
          <StyledPanel>
            <LatestBlocks blocks={blocks} loading={blocksLoading} />
            <AnchorWrapper>
              <Anchor to={"/blocks"}>View All</Anchor>
            </AnchorWrapper>
          </StyledPanel>
        </Section>

        <Section>
          <Title>Signed Transfers</Title>
          <StyledPanel>
            <LatestTransfers transfers={transfers} loading={transfersLoading} />
            <AnchorWrapper>
              <Anchor to={"/transfers"}>View All</Anchor>
            </AnchorWrapper>
          </StyledPanel>
        </Section>
      </SectionsWrapper>

      {modules?.assets && (
        <Section>
          <Title>Assets</Title>
          <StyledPanelTableWrapper
            footer={
              <AnchorWrapper>
                <Anchor to="/assets">View All</Anchor>
              </AnchorWrapper>
            }
          >
            <Assets />
          </StyledPanelTableWrapper>
        </Section>
      )}
    </FlexColumn>
  );
}
