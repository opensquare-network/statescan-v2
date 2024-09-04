import { useMemo } from "react";
import extractBlockInfo from "../utils/extractBlockInfo";

export default function useBlockInfo(blockData) {
  return useMemo(() => {
    if (!blockData) {
      return blockData;
    }
    return extractBlockInfo(blockData);
  }, [blockData]);
}
