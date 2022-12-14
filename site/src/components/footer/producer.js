import styled from "styled-components";
import { Flex } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";
import { PC } from "../styled/responsive";
import { ReactComponent as Logo } from "./logo-opensquare.svg";

const StyledLogo = styled(Logo)`
  * {
    fill: ${(p) => p.theme.fontTertiary};
  }
`;

const Wrapper = styled(Flex)`
  flex-wrap: nowrap;

  > :not(:first-child) {
    margin-left: 8px;
  }

  .wrap-on-mobile {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media screen and (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
    div {
      flex-wrap: nowrap;
    }

    .wrap-on-mobile {
      flex-basis: 100%;
      justify-content: center;
      height: 20px;
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
      <Text>{`© ${new Date().getFullYear()} Statescan Explorer`}</Text>
      <PC>
        <Text>·</Text>
      </PC>
      <div className="wrap-on-mobile">
        <Text>Powered by</Text>
        <a
          href="https://www.opensquare.network/"
          target="_blank"
          rel="noreferrer"
        >
          <StyledLogo />
        </a>
      </div>
    </Wrapper>
  );
}
