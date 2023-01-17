import { useEffect } from "react";
import noop from "lodash.noop";
import { StyledPanelTableWrapper } from "../styled/panel";
import Table from "../table/index";
import { useDispatch, useSelector } from "react-redux";
import {
  detailTablesLoading,
  detailTablesSelector,
  setDetailTable,
  setDetailTablesLoading,
} from "../../store/reducers/detailTablesSlice";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import api from "../../services/api";

export default function DetailTableNoPage({
  heads,
  transformData = noop,
  TableComponent,
  url,
}) {
  const dispatch = useDispatch();
  const chainSetting = useSelector(chainSettingSelector);
  const loading = useSelector(detailTablesLoading);
  const tables = useSelector(detailTablesSelector);
  const table = tables[url];

  useEffect(() => {
    if (!url) {
      return;
    }

    let isCancelled = false;

    dispatch(setDetailTablesLoading(true));

    api
      .fetch(url)
      .then(({ result }) => {
        if (isCancelled) {
          return;
        }
        if (result) {
          dispatch(setDetailTable({ key: url, value: result }));
        }
      })
      .finally(() => {
        dispatch(setDetailTablesLoading(false));
      });

    return () => {
      isCancelled = true;
    };
  }, [dispatch, url]);

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
    </StyledPanelTableWrapper>
  );
}
