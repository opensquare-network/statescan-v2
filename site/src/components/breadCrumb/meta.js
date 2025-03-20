import styled, { css } from "styled-components";
import { Panel } from "../styled/panel";
import { Inter_14_700, Inter_14_500 } from "../../styles/text";
import { ReactComponent as IconIdentity } from "../icons/meta/data-identity.svg";
import { ReactComponent as IconCaretUpright } from "../icons/caret-upright.svg";
import { Mobile, PC } from "../styled/responsive";
import getMetaData from "./metaJson";

const MetaInfoWraper = styled(Panel)`
  box-sizing: border-box;
  padding: 20px 24px;
  margin-bottom: 24px;
  display: flex;

  path {
    stroke: ${(p) => p.theme.fontTertiary};
  }
`;

const MetaInfoMobileWraper = styled(MetaInfoWraper)`
  padding: 20px 24px;
  margin-bottom: 24px;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
`;

const MetaInfoMain = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const MetaInfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const MetaInfoTitle = styled.h3`
  display: flex;
  flex-direction: row;
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_700};
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;

const MetaInfoDesc = styled.p`
  ${Inter_14_500};
  line-height: 20px;
  color: ${(p) => p.theme.fontSecondary};
  margin: 0;
  padding: 0;
`;

const MetaInfoIcon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(27, 32, 44, 0.05) 0%,
    rgba(27, 32, 44, 0) 100%
  );
  border-radius: 8px;
  flex-shrink: 0;
`;

const WikiLink = styled.a`
  color: ${(p) => p.theme.theme500};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
`;

const WikiLinkWrap = styled.div`
  display: flex;
  align-items: center;
`;

export default function MetaInfo({ data }) {
  const meta = getMetaData(data);

  if (!meta) return null;
  return (
    <>
      <PC>
        <MetaInfoPC data={meta} />
      </PC>
      <Mobile>
        <MetaInfoMobile data={meta} />
      </Mobile>
    </>
  );
}

function MetaInfoPC({ data }) {
  return (
    <MetaInfoWraper>
      <MetaInfoMain>
        <MetaInfoIcon>
          <IconIdentity width={24} height={24} />
        </MetaInfoIcon>

        <MetaInfoDetail>
          <MetaInfoTitle>
            <span>{data.name}</span> <LinkWrap wikiLink={data.wikiLink} />
          </MetaInfoTitle>
          <MetaInfoDesc>{data.desc}</MetaInfoDesc>
        </MetaInfoDetail>
      </MetaInfoMain>
    </MetaInfoWraper>
  );
}

function MetaInfoMobile({ data }) {
  return (
    <MetaInfoMobileWraper>
      <MetaInfoIcon>
        <IconIdentity width={24} height={24} />
      </MetaInfoIcon>

      <MetaInfoDetail>
        <MetaInfoTitle>{data.name}</MetaInfoTitle>
        <MetaInfoDesc>{data.desc}</MetaInfoDesc>
      </MetaInfoDetail>
      <LinkWrap wikiLink={data.wikiLink} />
    </MetaInfoMobileWraper>
  );
}

function LinkWrap({ wikiLink }) {
  return (
    <WikiLinkWrap>
      <WikiLink href={wikiLink} target="_blank">
        Wiki
      </WikiLink>
      <IconCaretUpright width={16} height={16} />
    </WikiLinkWrap>
  );
}
