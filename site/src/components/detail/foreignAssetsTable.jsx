import { useState } from "react";
import noop from "lodash.noop";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setAssetsCount } from "../../store/reducers/accountSlice";
import { DetailTableView, usePageInfo } from "./table";

export default function ForeignAssetsTable({
  id,
  heads,
  graphql,
  transformData = noop,
  TableComponent,
}) {
  const dispatch = useDispatch();
  const [table, setTable] = useState();
  const { page, pageSize } = usePageInfo();

  const { loading } = useQuery(graphql, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      address: id,
    },
    onCompleted: ({ accountForeignAssets: { holders, total } }) => {
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
