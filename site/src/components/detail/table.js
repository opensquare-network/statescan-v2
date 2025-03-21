import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import noop from "lodash.noop";
import { useQuery } from "@apollo/client";
import Pagination from "../pagination";
import { StyledPanelTableWrapper } from "../styled/panel";
import Table from "../table";
import { useDispatch, useSelector } from "react-redux";
import {
  detailTablesLoading,
  detailTablesSelector,
  setDetailTable,
  setDetailTablesLoading,
} from "../../store/reducers/detailTablesSlice";
import { setAssetsCount } from "../../store/reducers/accountSlice";
import { getPageFromQuery } from "../../utils/viewFuncs";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import api from "../../services/api";

function usePageInfo() {
  const location = useLocation();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  return {
    page,
    pageSize,
  };
}

function DetailTableView({
  heads,
  transformData = noop,
  TableComponent,
  loading,
  table,
}) {
  const chainSetting = useSelector(chainSettingSelector);
  const { page, pageSize } = usePageInfo();

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination page={page} pageSize={pageSize} total={table?.total} />
      }
    >
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

export default function DetailTable({
  requestType = "Api",
  graphql,
  id,
  url,
  heads,
  transformData = noop,
  TableComponent,
}) {
  return requestType === "Graphql" ? (
    <DetailTableUseGraphqlData
      id={id}
      heads={heads}
      graphql={graphql}
      transformData={transformData}
      TableComponent={TableComponent}
    />
  ) : (
    <DetailTableUseApiData
      heads={heads}
      url={url}
      transformData={transformData}
      TableComponent={TableComponent}
    />
  );
}

function DetailTableUseApiData({
  url,
  heads,
  transformData = noop,
  TableComponent,
}) {
  const dispatch = useDispatch();
  const { page, pageSize } = usePageInfo();
  const loading = useSelector(detailTablesLoading);
  const tables = useSelector(detailTablesSelector);
  const table = tables[url];

  useEffect(() => {
    if (!url) {
      return;
    }

    if (table?.page === page - 1) {
      return;
    }

    let isCancelled = false;

    dispatch(setDetailTablesLoading(true));

    api
      .fetch(url, { page: page - 1, pageSize })
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
  }, [dispatch, url, page, pageSize, table?.page]);
  return (
    <DetailTableView
      table={table}
      loading={loading}
      heads={heads}
      transformData={transformData}
      TableComponent={TableComponent}
    />
  );
}

function DetailTableUseGraphqlData({
  id,
  heads,
  graphql,
  transformData = noop,
  TableComponent,
}) {
  const dispatch = useDispatch();
  const [table, setTable] = useState();
  const { page, pageSize } = usePageInfo();

  useEffect(() => {
    dispatch(setAssetsCount(undefined));
  }, [dispatch]);

  const { loading } = useQuery(graphql, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      address: id,
    },
    onCompleted: ({ accountAssets: { holders, total } }) => {
      const result = {
        items: holders,
        total,
      };
      setTable(result);
      dispatch(setAssetsCount(total));
    },
  });
  return (
    <DetailTableView
      heads={heads}
      table={table}
      loading={loading}
      transformData={transformData}
      TableComponent={TableComponent}
    />
  );
}
