import { useEffect, useState } from "react";
import {
  convertArgsForJsonView,
  convertArgsForTableView,
} from "../utils/dataTransformer";
import DataDisplay from "./dataDisplay";
import { ReviveCallFormatProvider } from "./extrinsic/reviveCallData";

export default function ExtrinsicParametersDisplay({
  extrinsic,
  title,
  className,
}) {
  const [tableData, setTableData] = useState();
  const [jsonData, setJsonData] = useState();

  useEffect(() => {
    if (!extrinsic) {
      return;
    }
    const { section, method, args = [] } = extrinsic?.call || extrinsic;
    setTableData(convertArgsForTableView(args, section, method));
    setJsonData(convertArgsForJsonView(args, section, method));
  }, [extrinsic]);

  return (
    <ReviveCallFormatProvider>
      <DataDisplay
        tableData={tableData}
        JSONData={jsonData}
        title={title}
        className={className}
      />
    </ReviveCallFormatProvider>
  );
}
