import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import Api from "../services/api";
import { useLocation, useParams } from "react-router-dom";
import List from "../components/list";
import { Flex } from "../components/styled/flex";
import ExtrinsicsTable from "../components/block/tabTables/extrinsicsTable";
import EventsTable from "../components/block/tabTables/eventsTable";
import { useNavigate } from "react-router-dom";
import { getTabFromQuery } from "../utils/viewFuncs";
import Tab from "../components/tab";
import { blockTabs, Events, Extrinsics, Logs } from "../utils/constants";
import LogsTable from "../components/block/tabTables/logsTable";
import { currencify } from "../utils";
import { useDispatch } from "react-redux";
import DetailLayout from "../components/layout/detailLayout";
import { isHash } from "../utils/viewFuncs/text";
import {
  handleApiError,
  clearHttpError,
} from "../utils/viewFuncs/errorHeandles";
import { toBlockDetailItem } from "../utils/viewFuncs/toDetailItem";

function getCountByType(block, type) {
  if (type === Extrinsics) {
    return block?.extrinsicsCount;
  }
  if (type === Events) {
    return block?.eventsCount;
  }
  if (type === Logs) {
    return block?.digest?.logs?.length;
  }
}

function Block() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setTab] = useState(
    getTabFromQuery(location, "extrinsics"),
  );
  const [listData, setListData] = useState({});
  const [block, setBlock] = useState(null);
  const height = block?.height ?? (!isHash(id) ? parseInt(id) : 0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      Api.fetch(`/blocks/${id}`, {})
        .then(({ result: block }) => {
          setBlock(block);
          setListData(toBlockDetailItem(block));
        })
        .catch((e) => handleApiError(e, dispatch));
    }
  }, [dispatch, id]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Blocks", path: "/blocks" },
        { name: currencify(height) ?? "..." },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
      </Panel>

      <Flex>
        {blockTabs.map((tab, index) => (
          <Tab
            key={index}
            active={tab === selectedTab}
            text={tab}
            count={getCountByType(block, tab)}
            onClick={() => {
              navigate({ search: `?tab=${tab}&page=1` });
              setTab(tab);
            }}
          />
        ))}
      </Flex>
      {selectedTab === Extrinsics && <ExtrinsicsTable height={block?.height} />}
      {selectedTab === Events && <EventsTable height={block?.height} />}
      {selectedTab === Logs && (
        <LogsTable height={block?.height} logs={block?.digest?.logs} />
      )}
    </DetailLayout>
  );
}

export default Block;
