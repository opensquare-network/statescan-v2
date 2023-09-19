import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { useMemo } from "react";
import { currencify } from "../utils";
import { callsHead, extrinsicEventsHead } from "../utils/constants";
import { toEventTabTableItem } from "../utils/viewFuncs/toTableItem";
import DetailLayout from "../components/layout/detailLayout";
import { toExtrinsicDetailItem } from "../utils/viewFuncs/toDetailItem";
import ExtrinsicParametersDisplay from "../components/extrinsicParametersDisplay";
import DetailTabs from "../components/detail/tabs";
import useChainSettings from "../utils/hooks/chain/useChainSettings";
import useOnChainExtrinsicData from "../hooks/useOnChainExtrinsicData";
import useExtrinsicInfo from "../hooks/useExtrinsicInfo";
import PagingTable from "../components/detail/pagingTable";
import isNil from "lodash.isnil";
import { ColoredLink } from "../components/styled/link";
import ExtrinsicLink from "../components/extrinsic/link";
import { Tag } from "../components/tag";
import { useDispatch, useSelector } from "react-redux";
import { clearHttpError } from "../utils/viewFuncs/errorHandles";
import { setErrorCode } from "../store/reducers/httpErrorSlice";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";

function toCallTableItem(calls) {
  return calls?.map((item) => {
    return [
      <ColoredLink
        to={`/calls/${item?.indexer?.blockHeight}-${item?.indexer?.extrinsicIndex}-${item?.indexer?.callIndex}`}
      >
        {item?.indexer?.blockHeight.toLocaleString()}-{item?.indexer?.callIndex}
      </ColoredLink>,
      <ExtrinsicLink indexer={item?.indexer} />,
      <ColoredLink to={`/blocks/${item?.indexer?.blockHeight}`}>
        {item?.indexer?.blockHeight.toLocaleString()}
      </ColoredLink>,
      item?.indexer?.blockTime,
      <Tag>{item?.method}</Tag>,
      `${item?.section}(${item?.method})`,
      <ExtrinsicParametersDisplay extrinsic={{ call: item }} />,
    ];
  });
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

function OnChainExtrinsic() {
  const { id } = useParams();
  const { modules } = useChainSettings();
  const dispatch = useDispatch();
  const finalizedHeight = useSelector(finalizedHeightSelector);

  const { blockHeight, extrinsicIndex } = parseExtrinsicId(id);
  const extrinsicData = useOnChainExtrinsicData(blockHeight, extrinsicIndex);
  const extrinsicInfo = useExtrinsicInfo(extrinsicData);

  let isFinalized = null;
  if (extrinsicInfo && finalizedHeight) {
    isFinalized = extrinsicInfo?.indexer?.blockHeight <= finalizedHeight;
  }

  const extrinsic = useMemo(() => {
    if (!extrinsicInfo || isNil(isFinalized)) {
      return null;
    }
    return {
      ...extrinsicInfo,
      isFinalized,
    };
  }, [extrinsicInfo, isFinalized]);

  useEffect(() => {
    clearHttpError(dispatch);
    if (extrinsicData === null) {
      // Handle failed to load block data
      dispatch(setErrorCode(404));
    }
  }, [dispatch, extrinsicData]);

  const listData = useMemo(
    () =>
      extrinsic
        ? toExtrinsicDetailItem(extrinsic, {
            modules,
          })
        : {},
    [extrinsic, modules],
  );

  const tabs = [
    {
      name: "events",
      count: extrinsic?.eventsCount,
      children: (
        <PagingTable
          heads={extrinsicEventsHead}
          transformData={toEventTabTableItem}
          data={extrinsic?.events || []}
          isLoading={isNil(extrinsic?.events)}
        />
      ),
    },
    {
      name: "calls",
      count: extrinsic?.callsCount,
      children: (
        <PagingTable
          heads={callsHead}
          transformData={toCallTableItem}
          data={extrinsic?.calls || []}
          isLoading={isNil(extrinsic?.calls)}
        />
      ),
    },
  ];

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

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}

export default OnChainExtrinsic;
