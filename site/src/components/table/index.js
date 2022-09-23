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

export default function Table({ heads = [], data = [] }) {
  return (
    <StyledTable>
      <TableHead heads={heads} />

      <tbody>
        {data.map((items, index) => {
          return (
            <Tr key={index}>
              {items.map((item, index) => {
                const { align } = heads[index];
                const style = {
                  textAlign: align ?? "left",
                };
                return (
                  <Td style={style} key={index}>
                    {item}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
