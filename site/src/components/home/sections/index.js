import { FlexColumn } from "../../styled/flex";
import React from "react";
import { StyledPanelTableWrapper } from "../../styled/panel";
import { useSelector } from "react-redux";
import Assets from "./assets";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import Nfts from "./nfts";
import { assetListLoadingSelector } from "../../../store/reducers/assetSlice";
import { nftListLoadingSelector } from "../../../store/reducers/nftSlice";
import ExternalLink from "../../externalLink";
import TreasurySection from "./treasury";
import GovernanceSection from "./governance";
import IdentitySection from "./identity";
import { Anchor, AnchorWrapper, Section, Title } from "./styled";
import BlockAndTransfers from "./blockAndTransfers";
import RecoverySection from "./recovery";
import ForeignAssets from "./foreignAssets";

export default function Sections() {
  const assetsListLoading = useSelector(assetListLoadingSelector);
  const nftListLoading = useSelector(nftListLoadingSelector);
  const { modules, treasuryWebsite, subSquareWebsite } = useChainSettings();

  return (
    <FlexColumn gap={16}>
      <BlockAndTransfers />

      {modules?.governance && (
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

      {modules?.identity && (
        <Section>
          <Title>Identity</Title>
          <StyledPanelTableWrapper>
            <IdentitySection />
          </StyledPanelTableWrapper>
        </Section>
      )}

      {modules?.recovery && (
        <Section>
          <Title>Recovery</Title>
          <StyledPanelTableWrapper>
            <RecoverySection />
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

      {modules?.foreignAssets && (
        <Section>
          <Title>Foreign Assets</Title>
          <StyledPanelTableWrapper
            footer={
              <AnchorWrapper>
                <Anchor to="/foreign-assets">View All</Anchor>
              </AnchorWrapper>
            }
          >
            <ForeignAssets />
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
