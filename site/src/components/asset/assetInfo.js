import styled from "styled-components";
import Tooltip from "../tooltip";
import { Inter_14_500, Inter_14_600, Inter_20_700 } from "../../styles/text";

const Wrapper = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 700px) {
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

  > :not(:first-child) {
    margin-top: 12px;
  }

  .content {
    line-height: 20px;
    color: ${({ theme }) => theme.fontSecondary};
    word-wrap: break-word;
    text-align: justify;
    font-size: 14px;
  }

  .noinfo {
    ${Inter_14_500};
    color: ${({ theme }) => theme.fontTertiary};
  }

  h6 {
    all: unset;
    ${Inter_14_600};
  }
`;

const LinksWrapper = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, 20px);
`;

const LinkIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export default function AssetInfo({ data, symbol, name }) {
  return (
    <Wrapper>
      <LeftWrapper>
        <img
          className="logo"
          src={data?.icon ?? "/imgs/icons/default.svg"}
          alt="logo"
        />
        <SymbolWrapper>
          {symbol && <div className="symbol">{symbol}</div>}
          {name && <div className="name">{name}</div>}
        </SymbolWrapper>
      </LeftWrapper>
      <RightWrapper>
        <h6>ABOUT</h6>
        {data?.about && <div className="content">{data?.about}</div>}
        {!data?.about && <div className="noinfo">No more information.</div>}
        <LinksWrapper>
          {(data?.links || []).map((item, index) => (
            <Tooltip key={index} tip={item.url}>
              <a href={item.url}>
                <LinkIcon src={item.icon} />
              </a>
            </Tooltip>
          ))}
        </LinksWrapper>
      </RightWrapper>
    </Wrapper>
  );
}
