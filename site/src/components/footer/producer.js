import styled from "styled-components";
import { Flex } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";

const Wrapper = styled(Flex)`
  flex-wrap: nowrap;

  > :not(:first-child) {
    margin-left: 8px;
  }

  @media screen and (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
    div {
      flex-wrap: nowrap;
    }
  }

  a {
    display: flex;
  }
`;

const Text = styled.p`
  ${Inter_14_500};
  color: ${(p) => p.theme.fontSecondary};
`;

export default function Producer() {
  return (
    <Wrapper>
      <Wrapper>
        <Text>{`© ${new Date().getFullYear()} Statescan`}</Text>
        <Text>·</Text>
        <Text>Powered by</Text>
        <a
          href="https://www.opensquare.network/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/imgs/logo-opensquare.svg" alt="opensquare" />
        </a>
      </Wrapper>
    </Wrapper>
  );
}
