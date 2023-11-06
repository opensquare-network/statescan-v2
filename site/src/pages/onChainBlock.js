import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import {
  blockEventsHead,
  extrinsicsHead,
  Events,
  Extrinsics,
  Logs,
} from "../utils/constants";
import LogsTable from "../components/block/tabTables/logsTable";
import { currencify } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import DetailLayout from "../components/layout/detailLayout";
import { isHash } from "../utils/viewFuncs/text";
import {
  toEventTabTableItem,
  toExtrinsicsTabTableItem,
} from "../utils/viewFuncs/toTableItem";
import { toBlockDetailItem } from "../utils/viewFuncs/toDetailItem";
import { clearDetailTables } from "../store/reducers/detailTablesSlice";
import DetailTabs from "../components/detail/tabs";
import useOnChainBlockData from "../hooks/useOnChainBlockData";
import useBlockInfo from "../hooks/useBlockInfo";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";
import PagingTable from "../components/detail/pagingTable";
import isNil from "lodash.isnil";
import { clearHttpError } from "../utils/viewFuncs/errorHandles";
import { setErrorCode } from "../store/reducers/httpErrorSlice";
import { getIsSimpleMode } from "../utils/env";

function OnChainBlock() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blockData = useOnChainBlockData(id);
  const blockInfo = useBlockInfo(blockData);
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const isSimpleMode = getIsSimpleMode();

  useEffect(() => {
    clearHttpError(dispatch);
    if (blockData === null) {
      // Handle failed to load block data
      dispatch(setErrorCode(404));
    }
  }, [dispatch, blockData]);

  let isFinalized = null;
  if (blockInfo && finalizedHeight) {
    isFinalized = blockInfo?.height <= finalizedHeight;
  }

  const block = useMemo(() => {
    if (!blockInfo || isNil(isFinalized)) {
      return null;
    }
    return {
      ...blockInfo,
      isFinalized,
    };
  }, [blockInfo, isFinalized]);

  const height = block?.height ?? (!isHash(id) ? parseInt(id) : 0);

  const listData = useMemo(
    () => (block ? toBlockDetailItem(block) : {}),
    [block],
  );

  const breadCrumb = (
    <BreadCrumb
      data={[
        isSimpleMode ? { name: "Block" } : { name: "Blocks", path: "/blocks" },
        { name: currencify(height) ?? "..." },
      ]}
    />
  );

  const tabs = [
    {
      name: Extrinsics,
      count: block?.extrinsicsCount,
      children: (
        <PagingTable
          heads={extrinsicsHead}
          transformData={toExtrinsicsTabTableItem}
          data={blockInfo?.extrinsics || []}
          isLoading={isNil(blockInfo?.extrinsics)}
        />
      ),
    },
    {
      name: Events,
      count: block?.eventsCount,
      children: (
        <PagingTable
          heads={blockEventsHead}
          transformData={toEventTabTableItem}
          data={blockInfo?.events || []}
          isLoading={isNil(blockInfo?.events)}
        />
      ),
    },
    {
      name: Logs,
      count: block?.digest?.logs?.length,
      children: <LogsTable height={block?.height} logs={block?.digest?.logs} />,
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}

export default OnChainBlock;
