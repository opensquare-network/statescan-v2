import { useEffect, useState } from "react";
import extractEvent from "../utils/extractEventInfo";

export default function useEventInfo(eventData) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!eventData) {
      setData(null);
      return;
    }
    const data = extractEvent(eventData.event, eventData.indexer);
    setData(data);
  }, [eventData]);

  return data;
}
