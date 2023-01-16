import styled from "styled-components";
import { Inter_14_500, Inter_24_700 } from "../../styles/text";

const Title = styled.div`
  margin-top: 8px;
  word-break: break-all;
  ${Inter_24_700}
  color: ${(p) => p.theme.fontPrimary};
`;

const Content = styled.div`
  margin-top: 16px;
  font-weight: normal;
  ${Inter_14_500}
  color: ${(p) => p.theme.fontSecondary};
`;

const Wrapper = styled.div`
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
