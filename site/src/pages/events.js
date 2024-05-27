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
import * as queryString from "query-string";
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
import { getIsSimpleMode } from "../utils/env";
import CallCell from "../components/table/callCell";
import EventFilter from "../components/events/filter";

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

const toEventFields = (event, index) => {
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
    <CallCell call={event} />,
  ];
};

const toEventTabTableItem = (events) => {
  return (
    events?.map((event, index) => {
      return [
        ...toEventFields(event, index),
        <EventAttributeDisplay event={event} />,
      ];
    }) ?? null
  );
};

function Events() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const isSimpleMode = getIsSimpleMode();

  const list = useSelector(eventListSelector);
  const loading = useSelector(eventListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      eventFetchList(
        page - 1,
        pageSize,
        {
          ...(isSimpleMode ? {} : defaultFilterQuery),
          ...omit(queryString.parse(location.search), ["page", "spec"]),
        },
        { signal: controller.signal },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, page, pageSize, isSimpleMode]);

  useEffect(() => {
    return () => {
      dispatch(clearEventList());
    };
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Events" }]} />

      <EventFilter />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table
          heads={eventsHead}
          data={toEventTabTableItem(list?.items)}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Events;
