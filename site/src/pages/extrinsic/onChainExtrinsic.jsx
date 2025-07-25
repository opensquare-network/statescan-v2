import { Panel } from "../../components/styled/panel";
import BreadCrumb from "../../components/breadCrumb";
import React, { useEffect, useMemo, useState } from "react";
import List from "../../components/list";
import { currencify, isHash } from "../../utils";
import DetailLayout from "../../components/layout/detailLayout";
import { toExtrinsicDetailItem } from "../../utils/viewFuncs/toDetailItem";
import ExtrinsicParametersDisplay from "../../components/extrinsicParametersDisplay";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import isNil from "lodash.isnil";
import { useDispatch, useSelector } from "react-redux";
import { clearHttpError } from "../../utils/viewFuncs/errorHandles";
import { setErrorCode } from "../../store/reducers/httpErrorSlice";
import { finalizedHeightSelector } from "../../store/reducers/chainSlice";
import ExtrinsicDetailTabs from "./detailTabs";
import { useQueryExtrinsicInfo } from "../../hooks/useQueryExtrinsicInfo";
import useOnChainExtrinsicData from "../../hooks/useOnChainExtrinsicData";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { extrinsicApi } from "../../services/urls";
import useExtrinsicInfo from "../../hooks/useExtrinsicInfo";

export function OnChainExtrinsicImpl({ chainExtrinsic, isLoading = false }) {
  const { modules } = useChainSettings();
  const dispatch = useDispatch();
  const finalizedHeight = useSelector(finalizedHeightSelector);

  let isFinalized = null;
  if (chainExtrinsic && finalizedHeight) {
    isFinalized = chainExtrinsic?.indexer?.blockHeight <= finalizedHeight;
  }

  const extrinsic = useMemo(() => {
    if (!chainExtrinsic || isNil(isFinalized)) {
      return null;
    }
    return {
      ...chainExtrinsic,
      isFinalized,
    };
  }, [chainExtrinsic, isFinalized]);

  useEffect(() => {
    clearHttpError(dispatch);
    if (chainExtrinsic === null && !isLoading) {
      // Handle failed to load block data
      dispatch(setErrorCode(404));
    }
  }, [dispatch, chainExtrinsic, isLoading]);

  const listData = useMemo(
    () =>
      extrinsic
        ? toExtrinsicDetailItem(extrinsic, {
            modules,
          })
        : {},
    [extrinsic, modules],
  );

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

function parseExtrinsicId(id) {
  if (!id.includes("-")) {
    throw new Error("invalid extrinsic id: " + id);
  }
  const [blockHeight, extrinsicIndex] = id.split("-");
  return {
    blockHeight: parseInt(blockHeight),
    extrinsicIndex: parseInt(extrinsicIndex),
  };
}

function useExtrinsicIndexer() {
  const { id } = useParams();
  const [extrinsicIndexer, setExtrinsicIndexer] = useState({
    blockHeight: null,
    extrinsicIndex: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isHash(id)) {
      setExtrinsicIndexer(parseExtrinsicId(id));
      setIsLoading(false);
      return;
    }
    api.fetch(extrinsicApi(id)).then(({ result }) => {
      if (result) {
        setExtrinsicIndexer({
          blockHeight: result.indexer.blockHeight,
          extrinsicIndex: result.indexer.extrinsicIndex,
        });
        setIsLoading(false);
      }
    });
  }, [id]);

  return {
    extrinsicIndexer,
    isLoading,
  };
}

function OnChainExtrinsicFromIndexer({ blockHeight, extrinsicIndex }) {
  const { data } = useQueryExtrinsicInfo(blockHeight, extrinsicIndex);

  const extrinsicData = useOnChainExtrinsicData(blockHeight, extrinsicIndex);
  const extrinsicInfo = useExtrinsicInfo(extrinsicData);
  const chainExtrinsic = data?.chainExtrinsic || extrinsicInfo;

  return <OnChainExtrinsicImpl chainExtrinsic={chainExtrinsic} />;
}

function OnChainExtrinsic() {
  const { extrinsicIndexer, isLoading } = useExtrinsicIndexer();

  if (isLoading) {
    return <OnChainExtrinsicImpl isLoading={isLoading} />;
  }

  return <OnChainExtrinsicFromIndexer {...extrinsicIndexer} />;
}

export default OnChainExtrinsic;
