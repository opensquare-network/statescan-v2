import { ReactComponent as CheckIcon } from "../components/icons/check.svg";
import { ReactComponent as TimerIcon } from "../components/icons/timer.svg";
import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import { ColoredInterLink } from "../components/styled/link";
import Layout from "../components/layout";
import styled from "styled-components";
import Api from "../services/api";
import { Inter_14_500 } from "../styles/text";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { withCopy } from "../HOC/withCopy";
import EventsTable from "../components/extrinsic/tabTables/eventsTable";
import Tab from "../components/tab";
import { DetailedTime } from "../components/styled/time";
import { Tag, TagHighContrast } from "../components/tag";
import DataDisplay from "../components/dataDisplay";
import { Flex } from "../components/styled/flex";
import CallsTable from "../components/extrinsic/tabTables/callsTable";
import { useMemo } from "react";
import Address from "../components/address";
import { currencify } from "../utils";
import DetailedBlock from "../components/detail/block";

const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

const TextSecondaryWithCopy = withCopy(TextSecondary);

function Extrinsic() {
  const { id } = useParams();
  const [listData, setListData] = useState({});
  const [extrinsic, setExtrinsic] = useState(null);
  const [eventsCount, setEventsCount] = useState(0);
  const [callsCount, setCallsCount] = useState(0);

  const tabs = [
    { name: "Events", count: eventsCount },
    { name: "Calls", count: callsCount },
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
        <EventsTable
          extrinsicId={extrinsicId}
          setEventsCount={setEventsCount}
        />
      ),
    },
    {
      name: "Calls",
      table: (
        <CallsTable extrinsicId={extrinsicId} setCallsCount={setCallsCount} />
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      Api.fetch(`/extrinsics/${id}`, {}).then(({ result: extrinsic }) => {
        setExtrinsic(extrinsic);
        const data = {
          "Extrinsic Time": <DetailedTime ts={extrinsic?.indexer?.blockTime} />,
          Block: (
            <DetailedBlock blockHeight={extrinsic?.indexer?.blockHeight} />
          ),
          ...(extrinsic?.lifetime
            ? {
                "Life Time": (
                  <>
                    <ColoredInterLink to={`/block/${extrinsic?.lifetime?.[0]}`}>
                      {extrinsic?.lifetime?.[0].toLocaleString()}
                    </ColoredInterLink>
                    {" ~ "}
                    <ColoredInterLink to={`/block/${extrinsic?.lifetime?.[1]}`}>
                      {extrinsic?.lifetime?.[1].toLocaleString()}
                    </ColoredInterLink>
                  </>
                ),
              }
            : {}),
          "Extrinsic Hash": (
            <TextSecondaryWithCopy>{extrinsic?.hash}</TextSecondaryWithCopy>
          ),
          Module: <TagHighContrast>{extrinsic?.call?.section}</TagHighContrast>,
          Call: <Tag>{extrinsic?.call?.method}</Tag>,
          ...(extrinsic.isSigned
            ? {
                Singer: (
                  <Address address={extrinsic?.signer} ellipsis={false} />
                ),
              }
            : {}),
          ...(extrinsic?.nonce
            ? {
                Nonce: <TextSecondary>{extrinsic?.nonce}</TextSecondary>,
              }
            : {}),
          ...(extrinsic?.tip > 0
            ? {
                Tip: extrinsic?.tip,
              }
            : {}),
          Result: extrinsic?.isFinalized ? <CheckIcon /> : <TimerIcon />,
        };
        setListData(data);
      });
    }
  }, [id]);

  return (
    <Layout>
      <BreadCrumb
        data={[
          { name: "Extrinsics", path: "/extrinsics" },
          {
            name:
              `${currencify(extrinsic?.indexer?.blockHeight)}-${
                extrinsic?.indexer?.extrinsicIndex
              }` ?? "...",
          },
        ]}
      />
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

      {tables.map((item) => (
        <div
          key={item.name}
          style={{ display: activeTab === item.name ? "block" : "none" }}
        >
          {item.table}
        </div>
      ))}
    </Layout>
  );
}

export default Extrinsic;
