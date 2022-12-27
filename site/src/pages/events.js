import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { eventsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { ColoredLink } from "../components/styled/link";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import Filter from "../components/filter";
import * as queryString from "query-string";
import { useEventFilter } from "../utils/hooks/eventFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanEventList,
  eventFetchList,
  eventListLoadingSelector,
  eventListSelector,
} from "../store/reducers/eventSlice";
import EventAttributeDisplay from "../components/eventAttributeDisplay";
import omit from "lodash.omit";

const filter = [
  {
    value: "true",
    name: "Extrinsic",
    query: "is_extrinsic",
    options: [
      {
        text: "Extrinsic only",
        value: "true",
      },
      { text: "All", value: "" },
    ],
  },
  {
    value: "true",
    name: "Results",
    query: "no_extrinsic_result",
    options: [
      {
        text: "No Extrinsic results",
        value: "true",
      },
      { text: "All", value: "" },
    ],
  },
];

// FIXME: temporary fix
const defaultFilterQuery = {
  signed_only: "true",
  [filter[0].query]: filter[0].value,
  [filter[1].query]: filter[1].value,
};

function Events() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const filters = useEventFilter();

  const list = useSelector(eventListSelector);
  const loading = useSelector(eventListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      eventFetchList(
        page - 1,
        pageSize,
        {
          ...(location.search
            ? omit(queryString.parse(location.search), ["page"])
            : defaultFilterQuery),
        },
        { signal: controller.signal },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, page, pageSize]);

  useEffect(() => {
    dispatch(cleanEventList());
  }, [dispatch]);

  const data =
    list?.items?.map((event, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/event/${event?.indexer?.blockHeight}-${event?.indexer?.eventIndex}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}-
          {event?.indexer?.eventIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-2`}
          to={`/block/${event?.indexer?.blockHeight}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}
        </ColoredLink>,
        event?.indexer?.blockTime,
        <ColoredLink
          key={`${index}-3`}
          to={`/extrinsic/${event?.indexer?.blockHeight}-${event?.indexer?.extrinsicIndex}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}-
          {event?.indexer?.extrinsicIndex}
        </ColoredLink>,
        `${event?.section}(${event?.method})`,
        <EventAttributeDisplay event={event} />,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Events" }]} />

      <Filter
        title={`All ${list?.total?.toLocaleString?.() ?? ""} events`}
        data={filters}
      />

      <StyledPanelTableWrapper>
        <Table heads={eventsHead} data={data} loading={loading} />
        <Pagination
          page={parseInt(page)}
          pageSize={pageSize}
          total={list?.total}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Events;
