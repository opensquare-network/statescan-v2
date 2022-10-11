import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";
import { ReactComponent as Empty } from "../../icons/empty.svg";
import { Flex } from "../../styled/flex";

const TD = styled.td`
  height: 192px;
`;

const EmptyIcon = styled(Empty)`
  path {
    fill: ${(p) => p.theme.fontQuaternary};
  }
`;

const Hint = styled.p`
  color: ${(p) => p.theme.fontTertiary};
  margin: 0;
  margin-top: 4px;
  ${Inter_14_500};
`;

export default function TableEmpty() {
  return (
    <tbody>
      <tr>
        <TD colSpan="100%">
          <Flex style={{ justifyContent: "center" }}>
            <Flex style={{ flexDirection: "column" }}>
              <EmptyIcon />
              <Hint>No data</Hint>
            </Flex>
          </Flex>
        </TD>
      </tr>
    </tbody>
  );
}
