import Pagination from "../pagination";
import { noop } from "lodash";
import { StyledPanelTableWrapper } from "../styled/panel";
import Table from "../table";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanupDetailTables,
  detailTablesLoading,
  detailTablesSelector,
  fetchDetailTable,
} from "../../store/reducers/detailTablesSlice";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../../utils/viewFuncs";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";

export default function DetailTable({
  heads,
  transformData = noop,
  TableComponent,
  tableKey,
  url,
}) {
  const dispatch = useDispatch();
  const loading = useSelector(detailTablesLoading);
  const tables = useSelector(detailTablesSelector);
  const table = useMemo(() => tables[tableKey], [tables, tableKey]);
  const location = useLocation();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    if (url) {
      if (table?.page !== page - 1) {
        dispatch(fetchDetailTable(tableKey, url, page - 1, pageSize));
      }
    }

    return () => {
      dispatch(cleanupDetailTables());
    };
  }, [dispatch, url, page, pageSize, tableKey, table?.page]);

  return (
    <StyledPanelTableWrapper>
      {TableComponent ? (
        <TableComponent data={table?.items} loading={loading} />
      ) : (
        <Table
          loading={loading}
          heads={heads}
          data={transformData(table?.items)}
        />
      )}
      <Pagination page={page} pageSize={pageSize} total={table?.total} />
    </StyledPanelTableWrapper>
  );
}
