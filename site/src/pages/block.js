import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import Link from "../components/styled/link";
import Layout from "../components/layout";
import styled from "styled-components";
import Api from "../services/api";
import { Inter_14_500, SF_Mono_14_500 } from "../styles/text";
import { useLocation, useParams } from "react-router-dom";
import List from "../components/list";
import { Flex } from "../components/styled/flex";
import { withCopy } from "../HOC/withCopy";
import ExtrinsicsTable from "../components/block/tabTables/extrinsicsTable";
import EventsTable from "../components/block/tabTables/eventsTable";
import { useNavigate } from "react-router-dom";
import { getTabFromQuery } from "../utils/viewFuncs";
import Tab from "../components/tab";
import { blockTabs, Events, Extrinsics, Logs } from "../utils/constants";
import { DetailedTime } from "../components/styled/time";
import LogsTable from "../components/block/tabTables/logsTable";
import FinalizedState from "../components/states/finalizedState";
import { currencify } from "../utils";

const ColoredMonoLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
  ${SF_Mono_14_500};
`;

const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

const TextSecondaryWithCopy = withCopy(TextSecondary);
const ColoredMonoLinkWithCopy = withCopy(ColoredMonoLink);

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

  useEffect(() => {
    if (id) {
      Api.fetch(`/blocks/${id}`, {}).then(({ result: block }) => {
        setBlock(block);
        const data = {
          "Block Time": <DetailedTime ts={block?.time} />,
          Status: <FinalizedState finalized={block?.isFinalized} />,
          Hash: <TextSecondaryWithCopy>{block?.hash}</TextSecondaryWithCopy>,
          "Parent Hash": (
            <ColoredMonoLinkWithCopy
              to={`/block/${(Number.parseInt(block?.height) - 1).toString()}`}
            >
              {block?.parentHash}
            </ColoredMonoLinkWithCopy>
          ),
          "State Root": (
            <TextSecondaryWithCopy>{block?.stateRoot}</TextSecondaryWithCopy>
          ),
          "Extrinsics Root": (
            <TextSecondaryWithCopy>
              {block?.extrinsicsRoot}
            </TextSecondaryWithCopy>
          ),
          Validator: (
            <ColoredMonoLinkWithCopy to={""}>
              {block?.validator}
            </ColoredMonoLinkWithCopy>
          ),
        };
        setListData(data);
      });
    }
  }, [id]);

  return (
    <Layout>
      <BreadCrumb
        data={[
          { name: "Blocks", path: "/blocks" },
          { name: currencify(block?.height) ?? "..." },
        ]}
      />
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
    </Layout>
  );
}

export default Block;
