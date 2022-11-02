import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import Layout from "../components/layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import {
  assetDetailSelector,
  assetFetchDetail,
} from "../store/reducers/assetSlice";
import { toAssetDetailItem } from "../utils/viewFuncs/toDetailItem";
import AssetInfo from "../components/asset/assetInfo";

function Asset() {
  const { assetId } = useParams();
  const dispatch = useDispatch();

  const detail = useSelector(assetDetailSelector);

  const listData = useMemo(
    () => (detail ? toAssetDetailItem(assetId, detail) : {}),
    [assetId, detail],
  );

  useEffect(() => {
    if (assetId) {
      dispatch(assetFetchDetail(assetId));
    }
  }, [dispatch, assetId]);

  return (
    <Layout>
      <BreadCrumb
        data={[{ name: "Assets", path: "/assets" }, { name: assetId }]}
      />
      <Panel>
        <AssetInfo
          data={detail}
          symbol={detail?.metadata?.symbol}
          name={detail?.metadata?.name}
        />
        <List data={listData} />
      </Panel>
    </Layout>
  );
}

export default Asset;
