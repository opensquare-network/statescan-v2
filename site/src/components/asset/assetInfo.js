import { useSelector } from "react-redux";
import styled from "styled-components";
import { assetDetailSelector } from "../../store/reducers/assetSlice";
import { Inter_14_600, Inter_20_700 } from "../../styles/text";
import AssetLogo from "../assetLogo";
import About from "./about";

const Wrapper = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 700px) {
    padding-left: 0;
    flex-direction: column;
    > :not(:first-child) {
      margin-top: 16px;
    }
  }
  border-bottom: 1px solid ${({ theme }) => theme.strokeBase};
`;

const LeftWrapper = styled.div`
  display: flex;
  min-width: 240px;
  flex-wrap: wrap;

  .logo {
    width: 52px;
    height: 52px;
    margin-right: 16px;
    border-radius: 50%;
    object-fit: cover;
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

const RightWrapper = styled.div`
  flex: 1 1 auto;
`;

export default function AssetInfo({ symbol, name }) {
  const detail = useSelector(assetDetailSelector);

  return (
    <Wrapper>
      <LeftWrapper>
        <AssetLogo assetId={detail?.assetId} className="logo" />
        <SymbolWrapper>
          {symbol && <div className="symbol">{symbol}</div>}
          {name && <div className="name">{name}</div>}
        </SymbolWrapper>
      </LeftWrapper>
      <RightWrapper>
        <About />
      </RightWrapper>
    </Wrapper>
  );
}
