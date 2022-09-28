import { blockEventsHead } from "../../../utils/constants";
import Table from "../../table";
import React from "react";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Pagination from "../../pagination";
import { getPageFromQuery } from "../../../utils/viewFuncs";
import { useEffect, useState } from "react";
import Api from "../../../services/api";
import { useLocation } from "react-router-dom";
import { ColoredLink } from "../../styled/link";

function EventsTable({ height }) {
  const location = useLocation();
  const [events, setEvents] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);

  useEffect(() => {
    if (!height) {
      return;
    }
    setEvents(null);
    Api.fetch(`/blocks/${height}/events`, {
      page: getPageFromQuery(location) - 1,
    }).then(({ result }) => {
      setEvents(result?.items ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [location, height]);

  const data =
    events?.map((event, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/event/${event?.indexer?.blockHeight}-${event?.indexer?.eventIndex}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}-
          {event?.indexer?.eventIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-1`}
          to={`/extrinsic/${event?.indexer?.blockHeight}-${event?.indexer?.extrinsicIndex}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}-
          {event?.indexer?.extrinsicIndex}
        </ColoredLink>,
        `${event?.section}(${event?.method})`,
        event?.args,
      ];
    }) ?? null;

  return (
    <StyledPanelTableWrapper>
      <Table heads={blockEventsHead} data={data} />
      <Pagination page={parseInt(page)} pageSize={10} total={total} />
    </StyledPanelTableWrapper>
  );
}

export default EventsTable;
