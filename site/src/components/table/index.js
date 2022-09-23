import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";
import TableHead from "./head";

const StyledTable = styled.table`
  padding-top: 8px;
  padding-bottom: 8px;
  width: 100%;
  table-layout: fixed;
  background: ${(p) => p.theme.fillPanel};
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
  text-align: left;
`;

const Td = styled.td`
  padding: 16px 24px;
  ${Inter_14_500};
`;

export default function Table({ heads = [] }) {
  return (
    <StyledTable>
      <thead>
        <Tr>
          <TableHead heads={heads} />
        </Tr>
      </thead>

      <tbody>
        <Tr>
          <Td>111</Td>
          <Td>111</Td>
          <Td>111</Td>
          <Td>111</Td>
        </Tr>

        <Tr>
          <Td>111</Td>
          <Td>111</Td>
          <Td>111</Td>
          <Td>111</Td>
        </Tr>
      </tbody>
    </StyledTable>
  );
}
