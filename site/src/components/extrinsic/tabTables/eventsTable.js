import { toEventTabTableItem } from "../../../utils/viewFuncs/toTableItem";
import { extrinsicEventsHead } from "../../../utils/constants";
import { StyledPanelTableWrapper } from "../../styled/panel";
import { getPageFromQuery } from "../../../utils/viewFuncs";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../../pagination";
import Api from "../../../services/api";
import Table from "../../table";
import React from "react";

function EventsTable({ extrinsicId, setEventsCount }) {
  const location = useLocation();
  const [events, setEvents] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);

  useEffect(() => {
    if (!extrinsicId) {
      return;
    }
    setEvents(null);
    Api.fetch(`/extrinsics/${extrinsicId}/events`, {
      page: getPageFromQuery(location) - 1,
    }).then(({ result }) => {
      setEvents(result?.items ?? []);
      setTotal(result?.total ?? 0);
      setEventsCount(result?.total ?? 0);
    });
  }, [location, extrinsicId, setEventsCount]);

  return (
    <StyledPanelTableWrapper>
      <Table heads={extrinsicEventsHead} data={toEventTabTableItem(events)} />
      <Pagination page={parseInt(page)} pageSize={10} total={total} />
    </StyledPanelTableWrapper>
  );
}

export default EventsTable;
