import Pagination from "../pagination";
import noop from "lodash.noop";
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
import { chainSettingSelector } from "../../store/reducers/settingSlice";

export default function DetailTable({
  heads,
  transformData = noop,
  TableComponent,
  tableKey,
  url,
}) {
  const dispatch = useDispatch();
  const chainSetting = useSelector(chainSettingSelector);
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
          data={transformData(table?.items, chainSetting)}
        />
      )}
      <Pagination page={page} pageSize={pageSize} total={table?.total} />
    </StyledPanelTableWrapper>
  );
}
