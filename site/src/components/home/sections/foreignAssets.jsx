import { useQuery } from "@apollo/client";
import { foreignAssetsHead } from "../../../utils/constants";
import Table from "../../table";
import { useState } from "react";
import { GET_FOREIGN_ASSETS_LIST } from "../../../services/gql/foreignAssets";
import useForeignAssetsTableData from "../../../utils/hooks/useForeignAssetsTableData";

const page = 1;
const pageSize = 5;

export default function ForeignAssets() {
  const [data, setData] = useState();

  const { loading } = useQuery(GET_FOREIGN_ASSETS_LIST, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
    onCompleted: setData,
  });

  const tableData = useForeignAssetsTableData(data?.foreignAssets?.assets);

  return <Table heads={foreignAssetsHead} data={tableData} loading={loading} />;
}
