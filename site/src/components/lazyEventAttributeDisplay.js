import { useMemo } from "react";
import EventAttributeDisplay from "./eventAttributeDisplay";
import { useQueryEventInfo } from "../hooks/useQueryEventInfo";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";
import isNil from "lodash.isnil";
import { useSelector } from "react-redux";
import Loading from "./loadings/loading";

export default function LazyEventAttributeDisplay({ indexer }) {
  const { blockHeight, eventIndex } = indexer;
  const { data, loading } = useQueryEventInfo(blockHeight, eventIndex);

  const finalizedHeight = useSelector(finalizedHeightSelector);
  const isFinalized = blockHeight <= finalizedHeight;

  const chainEvent = data?.chainEvent;

  const event = useMemo(() => {
    if (!chainEvent || isNil(isFinalized)) {
      return null;
    }

    return {
      ...chainEvent,
      isFinalized,
    };
  }, [chainEvent, isFinalized]);

  if (loading) {
    return <Loading style={{ padding: 0 }} />;
  }

  return <EventAttributeDisplay event={event} />;
}
