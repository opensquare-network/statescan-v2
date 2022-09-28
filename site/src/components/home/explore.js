import styled from "styled-components";
import { Inter_24_700 } from "../../styles/text";
import Input from "../styled/input";
import { Button } from "../styled/buttons";
import { Flex } from "../styled/flex";
import { useSelector } from "react-redux";
import { chainSelector } from "../../store/reducers/settingSlice";

const Wrapper = styled(Flex)`
  gap: 16px;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
    input,
    button {
      flex-basis: 100%;
    }
  }
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

  return (
    <div>
      <Title>{chain} Explorer</Title>
      <Wrapper style={{ gap: 16 }}>
        <Input placeholder={"Block / Address / Extrinsic / Asset /..."} />
        <Button>Explore</Button>
      </Wrapper>
    </div>
  );
}
