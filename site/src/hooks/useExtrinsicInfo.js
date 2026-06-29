import { useEffect, useState } from "react";
import extractExtrinsicInfo from "../utils/extractExtrinsicInfo";
import { useChainApi } from "../utils/hooks/chain/useChainApi";

export default function useExtrinsicInfo(extrinsicData) {
  const [data, setData] = useState();
  const api = useChainApi();

  useEffect(() => {
    if (!api) {
      return;
    }
    if (!extrinsicData) {
      setData(extrinsicData);
      return;
    }
    extractExtrinsicInfo(api, extrinsicData)
      .then((result) => setData(result))
      .catch(() => setData(null));
  }, [extrinsicData, api]);

  return data;
}
