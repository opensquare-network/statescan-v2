import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import Api from "../services/api";
import { Inter_14_500 } from "../styles/text";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { DetailedTime } from "../components/styled/time";
import { Tag, TagHighContrast } from "../components/tag";
import DataDisplay from "../components/dataDisplay";
import { currencify } from "../utils";
import DetailedExtrinsicId from "../components/detail/extrinsicId";
import DetailedBlock from "../components/detail/block";

const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

function Event() {
  const { id } = useParams();
  const [listData, setListData] = useState({});
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      Api.fetch(`/events/${id}`, {}).then(({ result: event }) => {
        setEvent(event);
        const data = {
          "Event Time": <DetailedTime ts={event?.indexer?.blockTime} />,
          Block: <DetailedBlock blockHeight={event?.indexer?.blockHeight} />,
          "Extrinsic ID": (
            <DetailedExtrinsicId
              id={event?.indexer?.extrinsicIndex}
              blockHeight={event?.indexer?.blockHeight}
            />
          ),
          "Event Index": (
            <TextSecondary>{event?.indexer?.eventIndex}</TextSecondary>
          ),
          Module: <TagHighContrast>{event?.section}</TagHighContrast>,
          "Event Name": <Tag>{event?.method}</Tag>,
          // Description: (
          //   <TextSecondaryWithCopy>
          //     {event?.args?.[0].docs?.join("") || ""}
          //   </TextSecondaryWithCopy>
          // ),
          // TODO: Value field for transfer event
        };
        setListData(data);
      });
    }
  }, [id]);

  return (
    <Layout>
      <BreadCrumb
        data={[
          { name: "Events", path: "/events" },
          {
            name:
              `${currencify(event?.indexer?.blockHeight)}-${
                event?.indexer?.eventIndex
              }` ?? "...",
          },
        ]}
      />
      <Panel>
        <List data={listData} />
        <DataDisplay
          tableData={event?.args}
          JSONData={event}
          title="Attributes"
        />
      </Panel>
    </Layout>
  );
}

export default Event;
