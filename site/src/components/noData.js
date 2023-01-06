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

export default function NoData() {
  return (
    <Flex style={{ justifyContent: "center", height: "192px" }}>
      <Flex style={{ flexDirection: "column" }}>
        <EmptyIcon />
        <Hint>No data</Hint>
      </Flex>
    </Flex>
  );
}
