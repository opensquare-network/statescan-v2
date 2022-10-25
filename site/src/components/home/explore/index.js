import styled, { css } from "styled-components";
import { Inter_24_700 } from "../../../styles/text";
import { Button } from "../../styled/buttons";
import { Flex } from "../../styled/flex";
import { useSelector } from "react-redux";
import { chainSelector } from "../../../store/reducers/settingSlice";
import { mobilecss } from "../../../styles/responsive";
import ExploreInputOrigin from "./input";
import { useRef } from "react";

const ExploreInput = styled(ExploreInputOrigin)`
  width: 545px;

  ${mobilecss(css`
    width: 100%;
  `)}
`;

const Wrapper = styled(Flex)`
  position: relative;
  gap: 16px;

  ${mobilecss(css`
    flex-wrap: wrap;
    input,
    button {
      flex-basis: 100%;
    }
  `)}
`;

const Title = styled.h1`
  all: unset;
  margin-bottom: 24px;
  display: block;
  ${Inter_24_700};
  text-transform: capitalize;
  color: ${(props) => props.theme.fontPrimary};
`;

export default function Explore() {
  const chain = useSelector(chainSelector);
  const exploreRef = useRef();

  function handleExplore() {
    exploreRef.current.handleExplore();
  }

  return (
    <div>
      <Title>{chain} Explorer</Title>
      <Wrapper style={{ gap: 16 }}>
        <ExploreInput ref={exploreRef} />
        <Button onClick={handleExplore}>Explore</Button>
      </Wrapper>
    </div>
  );
}
