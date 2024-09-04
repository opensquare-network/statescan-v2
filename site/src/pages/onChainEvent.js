import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { currencify } from "../utils";
import DetailLayout from "../components/layout/detailLayout";
import { toEventDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch, useSelector } from "react-redux";
import { clearHttpError } from "../utils/viewFuncs/errorHandles";
import EventAttributeDisplay from "../components/eventAttributeDisplay";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";
import { setErrorCode } from "../store/reducers/httpErrorSlice";
import isNil from "lodash.isnil";
import { useQueryEventInfo } from "../hooks/useQueryEventInfo";
import useOnChainEventData from "../hooks/useOnChainEventData";
import useEventInfo from "../hooks/useEventInfo";

function parseEventId(id) {
  if (!id.includes("-")) {
    throw new Error("invalid event id: " + id);
  }
  const [blockHeight, eventIndex] = id.split("-");
  return {
    blockHeight: parseInt(blockHeight),
    eventIndex: parseInt(eventIndex),
  };
}

function OnChainEvent() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { blockHeight, eventIndex } = parseEventId(id);
  const { data } = useQueryEventInfo(blockHeight, eventIndex);

  const eventData = useOnChainEventData(blockHeight, eventIndex);
  const eventInfo = useEventInfo(eventData);

  const chainEvent = data?.chainEvent || eventInfo;

  const finalizedHeight = useSelector(finalizedHeightSelector);

  let isFinalized = null;
  if (chainEvent && finalizedHeight) {
    isFinalized = chainEvent?.indexer?.blockHeight <= finalizedHeight;
  }

  const event = useMemo(() => {
    if (!chainEvent || isNil(isFinalized)) {
      return null;
    }
    return {
      ...chainEvent,
      isFinalized,
    };
  }, [chainEvent, isFinalized]);

  useEffect(() => {
    clearHttpError(dispatch);
    if (chainEvent === null) {
      // Handle failed to load block data
      dispatch(setErrorCode(404));
    }
  }, [dispatch, chainEvent]);

  const listData = useMemo(
    () => (event ? toEventDetailItem(event) : {}),
    [event],
  );

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

export default OnChainEvent;
