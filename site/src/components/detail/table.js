import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import noop from "lodash.noop";
import { useQuery } from "@apollo/client";
import Pagination from "../pagination";
import { StyledPanelTableWrapper } from "../styled/panel";
import Table from "../table";
import { useDispatch, useSelector } from "react-redux";
import { setAssetsCount } from "../../store/reducers/accountSlice";
import { getPageFromQuery } from "../../utils/viewFuncs";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import { GET_ACCOUNT_ASSET } from "../../services/gql/assets";

export default function DetailTable({
  id,
  heads,
  transformData = noop,
  TableComponent,
}) {
  const dispatch = useDispatch();
  const chainSetting = useSelector(chainSettingSelector);
  const [table, setTable] = useState();
  const location = useLocation();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    dispatch(setAssetsCount(undefined));
  }, [setAssetsCount, dispatch]);

  const { loading } = useQuery(GET_ACCOUNT_ASSET, {
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
