import { useQuery } from "@apollo/client";
import { GET_ASSETS_LIST } from "../../../services/gql/assets";
import { assetsHead, ASSETS_SORT } from "../../../utils/constants";
import { useAssetsTableData } from "../../../utils/hooks/useAssetsTableData";
import Table from "../../table";
import { useState } from "react";

const page = 1;
const pageSize = 5;

export default function Assets() {
  const [data, setData] = useState();

  const { loading } = useQuery(GET_ASSETS_LIST, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      sort: ASSETS_SORT.HOLDERS_DESC,
    },
    onCompleted: setData,
  });

  const tableData = useAssetsTableData(data?.assets?.assets);

  return <Table heads={assetsHead} data={tableData} loading={loading} />;
}
