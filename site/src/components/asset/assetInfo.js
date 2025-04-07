import styled from "styled-components";
import { Inter_14_600, Inter_20_700 } from "../../styles/text";
import AssetLogo from "../assetLogo";
import About from "./about";
import ExternalLink from "../externalLink";
import { Button } from "../styled/buttons";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    padding-left: 0;
    > :not(:first-child) {
      margin-top: 16px;
    }
  }
  border-bottom: 1px solid ${({ theme }) => theme.strokeBase};
`;

const LogoWrapper = styled.div`
  display: flex;
  // min-width: 240px;
  flex: 1;
  flex-wrap: wrap;
  padding: 26px 24px;
  padding-top: 10px;

  .logo {
    width: 52px;
    height: 52px;
    margin-right: 16px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
    padding: 0;
    padding-top: 16px;
    .logo {
      margin-bottom: 16px;
    }
  }
`;

const LogoAndButtonWrapper = styled.div`
  position: relative;
  display: flex;
  // align-items: center;
  justify-content: space-between;
  padding-right: 24px;
  :hover {
    .edit {
      display: inline-flex;
    }
  }
  @media screen and (max-width: 900px) {
    padding-right: 0;
  }
`;

const SymbolWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }

  .symbol {
    ${Inter_20_700};
    color: ${({ theme }) => theme.fontPrimary};
  }

  .name {
    ${Inter_14_600};
    color: ${({ theme }) => theme.fontTertiary};
  }
`;

const InfoWrapper = styled.div`
  flex: 1 1 auto;
`;

const FormButton = styled(Button)`
  border: 1px solid var(--strokeBox);
  background-color: transparent;
  color: var(--fontPrimary);
  padding: 4px 12px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

const ExternalLinkWaaper = styled(ExternalLink)`
  text-decoration: none;
  margin-bottom: 10px;
  height: 28px;
  margin-top: 20px;
  display: none;

  @media screen and (max-width: 900px) {
    position: absolute;
    margin-bottom: 0;
    margin-top: 26px;
    right: 0;
    top: 0;
  }
`;

export default function AssetInfo({ detail, foreignAsset = false }) {
  const symbol = detail?.metadata?.symbol;
  const name = detail?.metadata?.name;

  return (
    <Wrapper>
      <LogoAndButtonWrapper>
        <LogoWrapper>
          <AssetLogo
            assetId={detail?.assetId}
            assetHeight={detail?.assetHeight}
            className="logo"
            foreignAsset={foreignAsset}
          />
          <SymbolWrapper>
            {symbol && <div className="symbol">{symbol}</div>}
            {name && <div className="name">{name}</div>}
          </SymbolWrapper>
        </LogoWrapper>
        <ExternalLinkWaaper
          className="edit"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfoMHYxCq17xSAyEiYiXNqcfGF-PPWYTJf1yIkzw1iNR22jyA/viewform"
        >
          <FormButton>Update Info</FormButton>
        </ExternalLinkWaaper>
      </LogoAndButtonWrapper>
      <InfoWrapper>
        <About detail={detail} />
      </InfoWrapper>
    </Wrapper>
  );
}
