import styled from "styled-components";
import Link from "../../styled/link";
import { Inter_12_500, Inter_20_700 } from "../../../styles/text";
import { Flex } from "../../styled/flex";

const Wrapper = styled(Flex)``;

const IconWrapper = styled.div`
  background: linear-gradient(135deg, #f8f8f8 0%, rgba(248, 248, 248, 0) 100%);
  border-radius: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  margin-left: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: flex-start;
  height: 16px;

  > :not(:first-child) {
    margin-left: 4px;
  }
`;

const Title = styled.p`
  all: unset;
  ${Inter_12_500};
  color: ${({ theme }) => theme.fontTertiary};
`;

const Text = styled.div`
  ${Inter_20_700};
  color: ${({ theme }) => theme.fontPrimary};
  margin: 0;

  :hover {
    color: ${(p) => p.themecolor};

    > :not(:first-child) {
      color: ${(p) => p.themecolor};
    }
  }

  > :not(:first-child) {
    margin-left: 4px;
    color: ${({ theme }) => theme.fontTertiary};
  }
`;

export default function OverviewItem({
  title,
  text,
  textSec,
  icon,
  link,
  tip,
}) {
  return (
    <Wrapper>
      <IconWrapper>
        <img src={`/imgs/icons/${icon}`} alt="" />
      </IconWrapper>
      <ContentWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        {link ? (
          <Link to={link}>
            <Text>
              <span>{text}</span>
              {textSec !== null && textSec !== undefined && (
                <>
                  <span>/</span>
                  <span>{textSec}</span>
                </>
              )}
            </Text>
          </Link>
        ) : (
          <Text>
            <span>{text}</span>
            {textSec !== null && textSec !== undefined && (
              <>
                <span>/</span>
                <span>{textSec}</span>
              </>
            )}
          </Text>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}
