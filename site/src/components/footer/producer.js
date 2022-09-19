import styled from "styled-components";
import { Flex } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";
import { PC } from "../styled/responsive";

const Wrapper = styled(Flex)`
  padding-left: 50px;
  padding-right: 50px;
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
      <Text>{`© ${new Date().getFullYear()} Statescan`}</Text>
      <PC>
        <Text>·</Text>
      </PC>
      <Text>Powered by</Text>
      <a
        href="https://www.opensquare.network/"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/imgs/logo-opensquare.svg" alt="opensquare" />
      </a>
    </Wrapper>
  );
}
