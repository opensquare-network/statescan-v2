import { Panel } from "../../components/styled/panel";
import BreadCrumb from "../../components/breadCrumb";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/list";
import { useMemo } from "react";
import { currencify } from "../../utils";
import DetailLayout from "../../components/layout/detailLayout";
import { toExtrinsicDetailItem } from "../../utils/viewFuncs/toDetailItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../../utils/viewFuncs/errorHandles";
import {
  extrinsicDetailSelector,
  extrinsicFetchDetail,
  clearExtrinsicDetail,
} from "../../store/reducers/extrinsicSlice";
import ExtrinsicParametersDisplay from "../../components/extrinsicParametersDisplay";
import { clearDetailTables } from "../../store/reducers/detailTablesSlice";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import api from "../../services/api";
import {
  extrinsicTransfersApi,
  extrinsicUniqueTransfersApi,
} from "../../services/urls";
import ExtrinsicDetailTabs from "./detailTabs";

function Extrinsic() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const extrinsic = useSelector(extrinsicDetailSelector);
  const { modules } = useChainSettings();

  const [assetTransferredList, setAssetTransferredList] = useState([]);
  const [uniqueTransferredList, setUniqueTransferredList] = useState([]);

  const listData = useMemo(
    () =>
      extrinsic
        ? toExtrinsicDetailItem(extrinsic, {
            modules,
            assetTransferredList,
            uniqueTransferredList,
          })
        : {},
    [extrinsic, modules, assetTransferredList, uniqueTransferredList],
  );

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      dispatch(extrinsicFetchDetail(id)).catch((e) =>
        handleApiError(e, dispatch),
      );
    }

    return () => {
      dispatch(clearExtrinsicDetail());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (modules?.assets) {
      api.fetch(extrinsicTransfersApi(id)).then(({ result }) => {
        setAssetTransferredList(result);
      });
    }

    if (modules?.uniques) {
      api.fetch(extrinsicUniqueTransfersApi(id)).then(({ result }) => {
        setUniqueTransferredList(result);
      });
    }
  }, [id, modules]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Extrinsics", path: "/extrinsics" },
        {
          name: extrinsic
            ? `${currencify(extrinsic?.indexer?.blockHeight)}-${
                extrinsic?.indexer?.extrinsicIndex ?? ""
              }`
            : "...",
        },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
        <ExtrinsicParametersDisplay extrinsic={extrinsic} title="Parameters" />
      </Panel>

      <ExtrinsicDetailTabs extrinsic={extrinsic} />
    </DetailLayout>
  );
}

export default Extrinsic;
