import { parseInt } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../../components/breadCrumb";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import {
  assetFetchList,
  assetListLoadingSelector,
  assetListSelector,
  clearAssetList,
} from "../../store/reducers/assetSlice";
import {
  destroyedAssetsHead,
  LIST_DEFAULT_PAGE_SIZE,
} from "../../utils/constants";
import { useDestroyedAssetsTableData } from "../../utils/hooks/useAssetsTableData";
import { getPageFromQuery } from "../../utils/viewFuncs";

export default function DestroyedAssets() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(assetListSelector);
  const loading = useSelector(assetListLoadingSelector);
  const data = useDestroyedAssetsTableData();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      assetFetchList(
        page - 1,
        pageSize,
        {
          destroyed: true,
        },
        {
          signal: controller.signal,
        },
      ),
    );

    return () => {
      controller.abort();
      dispatch(clearAssetList());
    };
  }, [dispatch, page, pageSize]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Destroyed Assets" }]} />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table heads={destroyedAssetsHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
