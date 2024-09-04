import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import {
  blockEventsHead,
  Events,
  Extrinsics,
  extrinsicsHead,
  Logs,
} from "../utils/constants";
import LogsTable from "../components/block/tabTables/logsTable";
import { currencify } from "../utils";
import { useDispatch } from "react-redux";
import DetailLayout from "../components/layout/detailLayout";
import { isHash } from "../utils/viewFuncs/text";
import {
  toEventTabTableItem,
  toExtrinsicsTabTableItem,
} from "../utils/viewFuncs/toTableItem";
import { toBlockDetailItem } from "../utils/viewFuncs/toDetailItem";
import { clearDetailTables } from "../store/reducers/detailTablesSlice";
import DetailTabs from "../components/detail/tabs";
import PagingTable from "../components/detail/pagingTable";
import isNil from "lodash.isnil";
import { clearHttpError } from "../utils/viewFuncs/errorHandles";
import { setErrorCode } from "../store/reducers/httpErrorSlice";
import { getIsSimpleMode } from "../utils/env";
import { useQueryBlockInfo } from "../hooks/useQueryBlockInfo";
import useOnChainBlockData from "../hooks/useOnChainBlockData";
import useBlockInfo from "../hooks/useBlockInfo";

function OnChainBlock() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data } = useQueryBlockInfo(id);

  const blockData = useOnChainBlockData(id);
  const blockInfo = useBlockInfo(blockData);

  const chainBlock = data?.chainBlock || blockInfo;

  const isSimpleMode = getIsSimpleMode();

  useEffect(() => {
    clearHttpError(dispatch);
    if (chainBlock === null) {
      // Handle failed to load block data
      dispatch(setErrorCode(404));
    }
  }, [dispatch, chainBlock]);

  const height = chainBlock?.height ?? (!isHash(id) ? parseInt(id) : 0);

  const listData = useMemo(
    () => (chainBlock ? toBlockDetailItem(chainBlock) : {}),
    [chainBlock],
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
      count: chainBlock?.extrinsicsCount,
      children: (
        <PagingTable
          heads={extrinsicsHead}
          transformData={toExtrinsicsTabTableItem}
          data={chainBlock?.extrinsics || []}
          isLoading={isNil(chainBlock?.extrinsics)}
        />
      ),
    },
    {
      name: Events,
      count: chainBlock?.eventsCount,
      children: (
        <PagingTable
          heads={blockEventsHead}
          transformData={toEventTabTableItem}
          data={chainBlock?.events || []}
          isLoading={isNil(chainBlock?.events)}
        />
      ),
    },
    {
      name: Logs,
      count: chainBlock?.digest?.logs?.length,
      children: (
        <LogsTable
          height={chainBlock?.height}
          logs={chainBlock?.digest?.logs}
        />
      ),
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
