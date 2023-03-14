import { FlexColumn, FlexEnd } from "../../styled/flex";
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
import Nfts from "./nfts";
import {
  border_theme,
  flex,
  flex_1,
  flex_col,
  gap_x,
  justify_between,
  max_w_full,
  no_underline,
  p_t,
  text_tertiary,
} from "../../../styles/tailwindcss";
import { assetListLoadingSelector } from "../../../store/reducers/assetSlice";
import { nftListLoadingSelector } from "../../../store/reducers/nftSlice";
import ExternalLink from "../../externalLink";
import TreasurySection from "./treasury";
import GovernanceSection from "./governance";

const Title = styled.h2`
  ${Inter_18_700};
  color: ${(props) => props.theme.fontPrimary};
`;

const Anchor = styled(Link)``;

const StyledPanel = styled(Panel)`
  min-height: 422px;
  ${p_t(8)};
  ${flex};
  ${flex_col};
  ${justify_between};

  .loading {
    padding: 0;
    height: calc(100% - 52px);
  }

  ${mdcss(css`
    max-width: 100%;
  `)}
`;

const Section = styled.div`
  ${flex};
  ${flex_col};
  ${flex_1};

  ${mobilecss(css`
    margin-top: 32px;
  `)}
`;

const SectionsWrapper = styled.div`
  ${flex};
  ${gap_x(24)};

  ${Section} {
    max-width: calc(50% - 12px);
    ${mdcss(max_w_full)};
  }

  ${mdcss(css`
    display: block;
  `)}
`;

const AnchorWrapper = styled(FlexEnd)`
  padding-right: 24px;
  height: 52px;
  border-top: 1px solid;
  ${border_theme("strokeBase")};
  ${Inter_14_500};
  ${text_tertiary};

  a {
    width: fit-content;
    text-align: right;
    color: ${(props) => props.theme.theme500};
    ${no_underline};

    ${(p) =>
      p.disabled &&
      css`
        pointer-events: none;
        ${text_tertiary};
      `}
  }
`;

export default function Sections() {
  const blocks = useSelector(latestBlocksSelector);
  const blocksLoading = useSelector(latestBlocksLoadingSelector);
  const transfers = useSelector(latestSignedTransfersSelector);
  const transfersLoading = useSelector(latestSignedTransfersLoadingSelector);
  const assetsListLoading = useSelector(assetListLoadingSelector);
  const nftListLoading = useSelector(nftListLoadingSelector);
  const { modules, treasuryWebsite, subSquareWebsite } = useChainSettings();

  return (
    <FlexColumn gap={16}>
      <SectionsWrapper>
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

        <Section>
          <Title>Signed Transfers</Title>
          <StyledPanel>
            <LatestTransfers transfers={transfers} loading={transfersLoading} />
            <AnchorWrapper>
              <Anchor
                disabled={!transfers?.length || transfersLoading}
                to={"/transfers"}
              >
                View All
              </Anchor>
            </AnchorWrapper>
          </StyledPanel>
        </Section>
      </SectionsWrapper>

      {modules.governance && (
        <Section>
          <Title>Governance</Title>
          <StyledPanelTableWrapper>
            <GovernanceSection />
            <AnchorWrapper>
              <div>
                <span>View on</span>{" "}
                <ExternalLink href={subSquareWebsite}>SubSquare</ExternalLink>
              </div>
            </AnchorWrapper>
          </StyledPanelTableWrapper>
        </Section>
      )}

      {modules?.treasury && (
        <Section>
          <Title>Treasury</Title>
          <StyledPanelTableWrapper>
            <TreasurySection />
            <AnchorWrapper>
              <div>
                <span>View on</span>{" "}
                <ExternalLink href={treasuryWebsite}>doTreasury</ExternalLink>
              </div>
            </AnchorWrapper>
          </StyledPanelTableWrapper>
        </Section>
      )}

      {modules?.assets && (
        <Section>
          <Title>Assets</Title>
          <StyledPanelTableWrapper
            footer={
              <AnchorWrapper>
                <Anchor disabled={assetsListLoading} to="/assets">
                  View All
                </Anchor>
              </AnchorWrapper>
            }
          >
            <Assets />
          </StyledPanelTableWrapper>
        </Section>
      )}

      {modules?.uniques && (
        <Section>
          <Title>NFT</Title>
          <StyledPanelTableWrapper
            footer={
              <AnchorWrapper>
                <Anchor disabled={nftListLoading} to="/uniques">
                  View All
                </Anchor>
              </AnchorWrapper>
            }
          >
            <Nfts />
          </StyledPanelTableWrapper>
        </Section>
      )}
    </FlexColumn>
  );
}
