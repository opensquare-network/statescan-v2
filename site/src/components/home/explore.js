import styled from "styled-components";
import { Inter_24_700 } from "../../styles/text";
import Input from "../styled/input";
import { Button } from "../styled/buttons";
import { Flex } from "../styled/flex";

const Wrapper = styled.div``;

const Title = styled.h1`
  all: unset;
  margin-bottom: 24px;
  display: block;
  ${Inter_24_700};
  text-transform: capitalize;
`;

export default function Explore() {
  return (
    <Wrapper>
      <Title>{process.env.REACT_APP_PUBLIC_NETWORK} Explorer</Title>
      <Flex style={{ gap: 16 }}>
        <Input placeholder={"Block / Address / Extrinsic / Asset /..."} />
        <Button>Explore</Button>
      </Flex>
    </Wrapper>
  );
}
