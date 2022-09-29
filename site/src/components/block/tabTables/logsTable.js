import { blockLogsHead } from "../../../utils/constants";
import Table from "../../table";
import React from "react";
import { StyledPanelTableWrapper } from "../../styled/panel";
import { ColoredLink } from "../../styled/link";

function LogsTable({ height, logs }) {
  const data =
    logs?.map((log, index) => {
      return [
        `${height.toLocaleString()}-${index}`,
        height?.toLocaleString(),
        Object.keys(log)[0],
        log,
      ];
    }) ?? null;

  return (
    <StyledPanelTableWrapper>
      <Table heads={blockLogsHead} data={data} />
    </StyledPanelTableWrapper>
  );
}

export default LogsTable;
