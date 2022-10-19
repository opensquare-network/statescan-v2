import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { Fragment, useEffect, useState } from "react";
import Api from "../services/api";
import { useParams } from "react-router-dom";
import List from "../components/list";
import Tab from "../components/tab";
import DataDisplay from "../components/dataDisplay";
import { Flex } from "../components/styled/flex";
import { useMemo } from "react";
import { currencify } from "../utils";
import { extrinsicEventsHead } from "../utils/constants";
import { toEventTabTableItem } from "../utils/viewFuncs/toTableItem";
import CallsTable from "../components/call/callsTable";
import DetailTable from "../components/detail/table";
import DetailLayout from "../components/layout/detailLayout";
import { toExtrinsicDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHeandles";

function Extrinsic() {
  const { id } = useParams();
  const [listData, setListData] = useState({});
  const [extrinsic, setExtrinsic] = useState(null);
  const dispatch = useDispatch();

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
      Api.fetch(`/extrinsics/${id}`, {})
        .then(({ result: extrinsic }) => {
          setExtrinsic(extrinsic);
          setListData(toExtrinsicDetailItem(extrinsic));
        })
        .catch((e) => handleApiError(e, dispatch));
    }
  }, [id]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Extrinsics", path: "/extrinsics" },
        {
          name:
            `${currencify(extrinsic?.indexer?.blockHeight)}-${
              extrinsic?.indexer?.extrinsicIndex ?? ""
            }` ?? "...",
        },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
        <DataDisplay
          tableData={extrinsic?.call}
          JSONData={extrinsic?.call}
          title="Parameters"
        />
      </Panel>

      <Flex>
        {tabs.map((item) => (
          <Tab
            key={item.name}
            text={item.name}
            count={item.count}
            active={activeTab === item.name}
            onClick={() => setActiveTab(item.name)}
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
