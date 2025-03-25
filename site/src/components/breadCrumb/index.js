import { Inter_20_700 } from "../../styles/text";
import styled from "styled-components";
import { Flex } from "../styled/flex";
import Link from "../styled/link";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import MetaInfo from "./meta";

const BreadCrumbWrapper = styled(Flex)`
  margin-bottom: 16px;
  height: 36px;
  ${Inter_20_700};

  > :not(:first-child) {
    margin-left: 8px;
  }

  > :not(:last-child):after {
    content: "/";
    margin-left: 8px;
    color: var(--fontTertiary);
  }

  > :last-child {
    color: ${(p) => p.theme.theme500};
  }
`;

const StyledLink = styled.span`
  display: inline;
  text-decoration: none;
  color: ${(p) => p.theme.fontPrimary};

  :hover {
    color: ${(p) => p.theme.theme500};
  }
`;

const StyledText = styled.span`
  color: ${(p) => p.theme.fontPrimary};
`;

export default function BreadCrumb({ data }) {
  const chainSetting = useSelector(chainSettingSelector);

  return (
    <>
      <BreadCrumbWrapper>
        <Link to={"/"}>
          <StyledLink>{chainSetting.name}</StyledLink>
        </Link>
        {(data || []).map((item, index) =>
          item.path ? (
            <Link to={item.path} key={index}>
              <StyledLink>{item.name}</StyledLink>
            </Link>
          ) : (
            <StyledText key={index}>{item.name}</StyledText>
          ),
        )}
      </BreadCrumbWrapper>
      <MetaInfo data={data} />
    </>
  );
}
