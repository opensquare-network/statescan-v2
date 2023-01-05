import styled from "styled-components";
import { Flex } from "../../styled/flex";
import { ReactComponent as BlockSVG } from "./block.svg";
import { Inter_12_400 } from "../../../styles/text";

const Wrapper = styled(Flex)`
  > :nth-child(1) {
    margin-right: 4px;
  }
`;

const BlockIcon = styled(BlockSVG)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

const Number = styled.div`
  ${Inter_12_400}
  color: ${(p) => p.theme.fontSecondary};
`;

export default function BlockHeight({ number }) {
  return (
    <Wrapper>
      <BlockIcon />
      <Number>{number}</Number>
    </Wrapper>
  );
}
