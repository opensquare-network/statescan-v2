import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import { ColoredMonoLink } from "../components/styled/link";
import Layout from "../components/layout";
import styled from "styled-components";
import Api from "../services/api";
import { Inter_14_500 } from "../styles/text";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { withCopy } from "../HOC/withCopy";
import { DetailedTime } from "../components/styled/time";
import { Tag, TagHighContrast } from "../components/tag";
import DataDisplay from "../components/dataDisplay";

const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

const ColoredMonoLinkWithCopy = withCopy(ColoredMonoLink);

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
          Block: (
            <ColoredMonoLinkWithCopy
              to={`/block/${event?.indexer?.blockHeight}`}
            >
              {event?.indexer?.blockHeight}
            </ColoredMonoLinkWithCopy>
          ),
          "Extrinsic ID": (
            <ColoredMonoLinkWithCopy
              to={`/extrinsic/${event?.indexer?.blockHeight}-${event?.indexer?.extrinsicIndex}`}
            >
              {`${event?.indexer?.blockHeight}-${event?.indexer?.extrinsicIndex}`}
            </ColoredMonoLinkWithCopy>
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
              `${event?.indexer?.blockHeight}-${event?.indexer?.eventIndex}` ??
              "...",
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
