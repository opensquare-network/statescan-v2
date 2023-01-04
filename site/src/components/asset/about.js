import styled from "styled-components";
import { Inter_14_500, Inter_14_600 } from "../../styles/text";
import ExternalLink from "../externalLink";
import EditIcon from "../icons/editIcon";
import Tooltip from "../tooltip";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 12px;
  }
`;

const TitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  .edit {
    display: none;
  }

  :hover {
    .edit {
      display: inline-flex;
    }
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.fontPrimary};
  ${Inter_14_600};
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

const NoInfo = styled.div`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontTertiary};
`;

const AboutContent = styled.div`
  line-height: 20px;
  color: ${({ theme }) => theme.fontSecondary};
  word-wrap: break-word;
  text-align: justify;
  font-size: 14px;
`;

export default function About({ data }) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>ABOUT</Title>
        <ExternalLink
          className="edit"
          href="https://forms.gle/9C3zJAS9YzYtoJFs9"
        >
          <EditIcon />
        </ExternalLink>
      </TitleWrapper>
      {data?.about ? (
        <AboutContent>{data?.about}</AboutContent>
      ) : (
        <NoInfo>No more information.</NoInfo>
      )}
      <LinksWrapper>
        {(data?.links || []).map((item, index) => (
          <Tooltip key={index} tip={item.url}>
            <a href={item.url}>
              <LinkIcon src={item.icon} />
            </a>
          </Tooltip>
        ))}
      </LinksWrapper>
    </Wrapper>
  );
}
