import {
  blockEventsHead,
  LIST_DEFAULT_PAGE_SIZE,
} from "../../../utils/constants";
import Table from "../../table";
import React from "react";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Pagination from "../../pagination";
import { getPageFromQuery } from "../../../utils/viewFuncs";
import { useEffect, useState } from "react";
import Api from "../../../services/api";
import { useLocation } from "react-router-dom";
import { toEventTabTableItem } from "../../../utils/viewFuncs/toTableItem";

function EventsTable({ height }) {
  const location = useLocation();
  const [events, setEvents] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    if (!height) {
      return;
    }
    setEvents(null);
    Api.fetch(`/blocks/${height}/events`, {
      page: getPageFromQuery(location) - 1,
      pageSize,
    }).then(({ result }) => {
      setEvents(result?.items ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [location, pageSize, height]);

  return (
    <StyledPanelTableWrapper>
      <Table heads={blockEventsHead} data={toEventTabTableItem(events)} />
      <Pagination page={parseInt(page)} pageSize={pageSize} total={total} />
    </StyledPanelTableWrapper>
  );
}

export default EventsTable;
