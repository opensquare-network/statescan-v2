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
  clearEventList,
  eventFetchList,
  eventListLoadingSelector,
  eventListSelector,
} from "../store/reducers/eventSlice";
import EventAttributeDisplay from "../components/eventAttributeDisplay";
import omit from "lodash.omit";
import ExtrinsicLink from "../components/extrinsic/link";

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

const defaultFilterQuery = {
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
          ...defaultFilterQuery,
          ...omit(queryString.parse(location.search), ["page", "spec"]),
        },
        { signal: controller.signal },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, page, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(clearEventList());
    };
  }, [dispatch]);

  const data =
    list?.items?.map((event, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/events/${event?.indexer?.blockHeight}-${event?.indexer?.eventIndex}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}-
          {event?.indexer?.eventIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-2`}
          to={`/blocks/${event?.indexer?.blockHeight}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}
        </ColoredLink>,
        event?.indexer?.blockTime,
        <ExtrinsicLink key={`${index}-3`} indexer={event?.indexer} />,
        `${event?.section}(${event?.method})`,
        <EventAttributeDisplay event={event} />,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Events" }]} />

      <Filter data={filters} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table heads={eventsHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Events;
