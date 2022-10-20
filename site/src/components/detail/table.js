import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { getPageFromQuery } from "../../utils/viewFuncs";
import Pagination from "../pagination";
import { noop } from "lodash";
import { StyledPanelTableWrapper } from "../styled/panel";
import Table from "../table";

export default function DetailTable({
  url,
  heads,
  transformData = noop,
  TableComponent,
}) {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    if (!url) {
      return;
    }

    setData(null);
    api
      .fetch(url, {
        page: page - 1,
        pageSize,
      })
      .then(({ result }) => {
        setData(result?.items ?? []);
        setTotal(result?.total ?? 0);
      });
  }, [url, page, pageSize]);

  return (
    <StyledPanelTableWrapper>
      {TableComponent ? (
        <TableComponent data={data} />
      ) : (
        <Table heads={heads} data={transformData(data)} />
      )}
      <Pagination page={page} pageSize={pageSize} total={total} />
    </StyledPanelTableWrapper>
  );
}
