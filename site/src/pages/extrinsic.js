import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { Fragment, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import List from "../components/list";
import Tab from "../components/tab";
import { Flex } from "../components/styled/flex";
import { useMemo } from "react";
import { currencify } from "../utils";
import { extrinsicEventsHead } from "../utils/constants";
import { toEventTabTableItem } from "../utils/viewFuncs/toTableItem";
import CallsTable from "../components/call/callsTable";
import DetailTable from "../components/detail/table";
import DetailLayout from "../components/layout/detailLayout";
import { toExtrinsicDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHeandles";
import {
  extrinsicDetailSelector,
  extrinsicFetchDetail,
  resetExtrinsicDetail,
} from "../store/reducers/extrinsicSlice";
import ExtrinsicParametersDisplay from "../components/extrinsicParametersDisplay";
import { clearDetailTables } from "../store/reducers/detailTablesSlice";

function Extrinsic() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const extrinsic = useSelector(extrinsicDetailSelector);
  const [, setSearchParams] = useSearchParams();

  const listData = useMemo(
    () => (extrinsic ? toExtrinsicDetailItem(extrinsic) : {}),
    [extrinsic],
  );

  const tabs = [
    { name: "Events", count: extrinsic?.eventsCount },
    { name: "Calls", count: extrinsic?.callsCount },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const extrinsicId = useMemo(() => {
    if (!extrinsic) {
      return null;
    }

    return `${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`;
  }, [extrinsic]);

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  const tables = [
    {
      name: "Events",
      table: (
        <DetailTable
          url={extrinsicId ? `/extrinsics/${extrinsicId}/events` : ""}
          heads={extrinsicEventsHead}
          transformData={toEventTabTableItem}
        />
      ),
    },
    {
      name: "Calls",
      table: (
        <DetailTable
          url={extrinsicId ? `/extrinsics/${extrinsicId}/calls` : ""}
          TableComponent={CallsTable}
        />
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      dispatch(extrinsicFetchDetail(id)).catch((e) =>
        handleApiError(e, dispatch),
      );
    }

    return () => {
      dispatch(resetExtrinsicDetail());
    };
  }, [id, dispatch]);

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

      <Flex>
        {tabs.map((item) => (
          <Tab
            key={item.name}
            text={item.name}
            count={item.count}
            active={activeTab === item.name}
            onClick={() => {
              setActiveTab(item.name);
              setSearchParams("");
            }}
          />
        ))}
      </Flex>

      {tables.map(
        (item) =>
          activeTab === item.name && (
            <Fragment key={item.name}>{item.table}</Fragment>
          ),
      )}
    </DetailLayout>
  );
}

export default Extrinsic;
