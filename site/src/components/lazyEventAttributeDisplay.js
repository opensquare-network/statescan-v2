import { useMemo, useState, useEffect } from "react";
import EventAttributeDisplay from "./eventAttributeDisplay";
import { useQueryEventInfo } from "../hooks/useQueryEventInfo";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";
import isNil from "lodash.isnil";
import { useSelector } from "react-redux";
import Loading from "./loadings/loading";

export default function LazyEventAttributeDisplay({ indexer }) {
  const [isLoading, setIsLoading] = useState(true);
  const { blockHeight, eventIndex } = indexer;
  const { data } = useQueryEventInfo(blockHeight, eventIndex);

  const chainEvent = data?.chainEvent;

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
    if (isNil(blockHeight) || isNil(eventIndex) || !event) {
      return;
    }

    setIsLoading(false);
  }, [blockHeight, event, eventIndex, isLoading]);

  if (isLoading) {
    return <Loading style={{ padding: 0 }} />;
  }

  return <EventAttributeDisplay event={event} />;
}
