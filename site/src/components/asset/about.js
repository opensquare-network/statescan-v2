import styled from "styled-components";
import { Inter_14_500, Inter_14_600 } from "../../styles/text";
import Tooltip from "../tooltip";
import { Flex, FlexColumn } from "../styled/flex";
import Governance from "./governance";
import { useAssetInfoDataDetail } from "../../utils/hooks/useAssetInfoData";
import LinkLinksIcon from "../icons/linkLinksIcon";
import { useSelector } from "react-redux";
import { mode, modeSelector } from "../../store/reducers/settingSlice";
import List from "../list";

const Wrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.strokeBase};
  padding-right: 24px;
  > :not(:first-child) {
    margin-top: 12px;
  }
  @media screen and (max-width: 900px) {
    padding-right: 0;
    margin: 0;
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.fontPrimary};
  ${Inter_14_600};
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, 20px);
`;

const LinkIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const AboutContent = styled.div`
  color: ${({ theme }) => theme.fontSecondary};
  word-wrap: break-word;
  text-align: justify;
  ${Inter_14_500};
`;

const GovernanceWrapper = styled.div`
  margin-top: 12px;
`;

export default function About({ detail }) {
  const data = useAssetInfoDataDetail(detail);
  const themeMode = useSelector(modeSelector);

  if (!data?.about && !data?.links && !data?.governances) {
    return null;
  }

  const renderItem = {};

  if (data?.about) {
    renderItem["Info"] = <AboutContent>{data?.about}</AboutContent>;
  }

  if (data?.links?.length) {
    renderItem["Related Link"] = (
      <LinksWrapper>
        {(data?.links || []).map((item, index) => (
          <Tooltip key={index} tip={item.url}>
            <a href={item.url}>
              {item.darkIcon && themeMode === mode.dark ? (
                <LinkIcon src={item.darkIcon} />
              ) : item.icon ? (
                <LinkIcon src={item.icon} />
              ) : (
                <LinkLinksIcon />
              )}
            </a>
          </Tooltip>
        ))}
      </LinksWrapper>
    );
  }

  return (
    <Wrapper>
      <List data={renderItem} wrapperCompact />

      {data?.governances && (
        <GovernanceWrapper>
          <FlexColumn gap={8}>
            <Title>GOVERNANCE</Title>
            <Flex gap={16} style={{ flexWrap: "wrap" }}>
              {data.governances.map((governance, idx) => (
                <Governance key={idx} {...governance} />
              ))}
            </Flex>
          </FlexColumn>
        </GovernanceWrapper>
      )}
    </Wrapper>
  );
}
