import InnerTable from "../nestedTable/innerTable";
import styled from "styled-components";
import { Inter_14_600 } from "../../../styles/text";

const Wrapper = styled.div`
  padding: 24px;
  border-top: 1px solid ${({ theme }) => theme.strokeBase};
  color: ${({ theme }) => theme.fontPrimary};
`;

const Title = styled.p`
  ${Inter_14_600};
`;

const TableWrapper = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.fillBase};
`;

export default function DataTable({ data, title }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <TableWrapper>
        <InnerTable data={data} />
      </TableWrapper>
    </Wrapper>
  );
}
