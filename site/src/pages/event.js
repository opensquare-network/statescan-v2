import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { currencify } from "../utils";
import DetailLayout from "../components/layout/detailLayout";
import { toEventDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHandles";
import {
  eventDetailSelector,
  eventFetchDetail,
  clearEventDetail,
} from "../store/reducers/eventSlice";
import EventAttributeDisplay from "../components/eventAttributeDisplay";

function Event() {
  const { id } = useParams();
  const event = useSelector(eventDetailSelector);
  const dispatch = useDispatch();

  const listData = useMemo(
    () => (event ? toEventDetailItem(event) : {}),
    [event],
  );

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      dispatch(eventFetchDetail(id)).catch((e) => handleApiError(e, dispatch));
    }

    return () => {
      dispatch(clearEventDetail());
    };
  }, [id, dispatch]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Events", path: "/events" },
        {
          name: event
            ? `${currencify(event?.indexer?.blockHeight)}-${
                event?.indexer?.eventIndex
              }`
            : "...",
        },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
        <EventAttributeDisplay event={event} title="Attributes" />
      </Panel>
    </DetailLayout>
  );
}

export default Event;
