import InnerTable from "../table/nestedTable/innerTable";
import styled, { css } from "styled-components";
import { Inter_12_600, Inter_14_600 } from "../../styles/text";
import { Flex, FlexBetween } from "../styled/flex";
import { useState } from "react";
import JsonView from "../JSON";
import { bg_theme, p } from "../../styles/tailwindcss";

const Wrapper = styled.div`
  padding: 24px;
  border-top: 1px solid ${({ theme }) => theme.strokeBase};
  color: ${({ theme }) => theme.fontPrimary};
`;

const Title = styled.p`
  ${Inter_14_600};
`;

const TableWrapper = styled.div`
  background: ${({ theme }) => theme.fillBase};
`;

const Toolbar = styled(FlexBetween)`
  margin-bottom: 16px;
`;

const TabsWrapper = styled(Flex)`
  gap: 8px;
`;

const tabActive = css`
  cursor: pointer;
  color: ${({ theme }) => theme.theme500};
  background: ${({ theme }) => theme.theme100};
`;

const Tab = styled.button`
  all: unset;
  padding: 2px 6px;
  border-radius: 4px;
  ${Inter_12_600};
  color: ${({ theme }) => theme.fontSecondary};
  background: ${({ theme }) => theme.fillSub};

  &:hover {
    ${tabActive};
  }

  ${(p) => p.active && tabActive};
`;

const DataTableWrapper = styled.div`
  ${p(24)}
  ${bg_theme("fillBase")}
`;

export default function DataDisplay({ tableData, JSONData, title, className }) {
  const [format, setFormat] = useState("table");

  if (!tableData && !JSONData) {
    return null;
  }

  const dataTable = (
    <TableWrapper className={className}>
      <Toolbar>
        <TabsWrapper>
          <Tab
            active={format === "table"}
            onClick={() => {
              setFormat("table");
            }}
          >
            Table
          </Tab>
          <Tab
            active={format === "JSON"}
            onClick={() => {
              setFormat("JSON");
            }}
          >
            JSON
          </Tab>
        </TabsWrapper>
      </Toolbar>
      {format === "table" && <InnerTable data={tableData} />}
      {format === "JSON" && <JsonView src={JSONData} />}
    </TableWrapper>
  );

  if (!title) {
    return dataTable;
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <DataTableWrapper>{dataTable}</DataTableWrapper>
    </Wrapper>
  );
}
