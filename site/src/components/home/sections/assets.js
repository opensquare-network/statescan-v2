import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assetFetchList,
  assetListLoadingSelector,
} from "../../../store/reducers/assetSlice";
import { assetsHead } from "../../../utils/constants";
import { useAssetsTableData } from "../../../utils/hooks/useAssetsTableData";
import Table from "../../table";

const page = 0;
const pageSize = 4;

export default function Assets() {
  const dispatch = useDispatch();
  const loading = useSelector(assetListLoadingSelector);
  const data = useAssetsTableData();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      assetFetchList(
        page,
        pageSize,
        { sort: "holders" },
        {
          signal: controller.signal,
        },
      ),
    );

    return () => controller.abort();
  }, [dispatch]);

  return <Table heads={assetsHead} data={data} loading={loading} />;
}
