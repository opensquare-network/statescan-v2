import styled from "styled-components";

const Title = styled.div`
  margin-top: 8px;
  word-break: break-all;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  color: ${(p) => p.theme.fontPrimary};
`;

const Content = styled.div`
  margin-top: 16px;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.fontSecondary};
`;

const Wrapper = styled.div`
  padding-left: 24px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    > :not(:first-child) {
      margin-top: 16px;
    }
  }
`;

export default function NftInfo({ title, description }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {description ? (
        <Content>{description}</Content>
      ) : (
        <Content>No more description.</Content>
      )}
    </Wrapper>
  );
}
