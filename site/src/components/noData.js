import styled from "styled-components";
import { Inter_14_500 } from "../styles/text";
import EmptyIcon from "./icons/emptyIcon";
import { Flex } from "./styled/flex";

const Hint = styled.p`
  color: ${(p) => p.theme.fontTertiary};
  margin: 0;
  margin-top: 4px;
  ${Inter_14_500};
`;

const Wrapper = styled(Flex)`
  justify-content: center;
  height: 192px;
`;

export default function NoData({ text = "No data", className }) {
  return (
    <Wrapper className={className}>
      <Flex style={{ flexDirection: "column" }}>
        <EmptyIcon />
        <Hint>{text}</Hint>
      </Flex>
    </Wrapper>
  );
}
