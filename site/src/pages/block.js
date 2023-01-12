import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import {
  blockEventsHead,
  blockExtrinsicsHead,
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
  handleApiError,
  clearHttpError,
} from "../utils/viewFuncs/errorHandles";
import DetailTable from "../components/detail/table";
import {
  toEventTabTableItem,
  toExtrinsicsTabTableItem,
} from "../utils/viewFuncs/toTableItem";
import {
  blockDetailSelector,
  blockFetchDetail,
  resetBlockDetail,
} from "../store/reducers/blockSlice";
import { toBlockDetailItem } from "../utils/viewFuncs/toDetailItem";
import { clearDetailTables } from "../store/reducers/detailTablesSlice";
import DetailTabs from "../components/detail/tabs";

function Block() {
  const { id } = useParams();
  const block = useSelector(blockDetailSelector);
  const height = block?.height ?? (!isHash(id) ? parseInt(id) : 0);
  const dispatch = useDispatch();

  const listData = useMemo(
    () => (block ? toBlockDetailItem(block) : {}),
    [block],
  );

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      dispatch(blockFetchDetail(id)).catch((e) => handleApiError(e, dispatch));
    }

    return () => {
      dispatch(resetBlockDetail());
    };
  }, [id, dispatch]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Blocks", path: "/blocks" },
        { name: currencify(height) ?? "..." },
      ]}
    />
  );

  const tabs = [
    {
      name: Extrinsics,
      count: block?.extrinsicsCount,
      children: (
        <DetailTable
          url={`/blocks/${block?.height}/${Extrinsics}`}
          heads={blockExtrinsicsHead}
          transformData={toExtrinsicsTabTableItem}
        />
      ),
    },
    {
      name: Events,
      count: block?.eventsCount,
      children: (
        <DetailTable
          url={`/blocks/${block?.height}/${Events}`}
          heads={blockEventsHead}
          transformData={toEventTabTableItem}
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

export default Block;
