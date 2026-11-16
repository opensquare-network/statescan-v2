import { useEffect, useState } from "react";
import {
  convertArgsForJsonView,
  convertArgsForTableView,
} from "../utils/dataTransformer";
import DataDisplay from "./dataDisplay";
import { ReviveCallFormatProvider } from "./extrinsic/reviveCallData";
import { useVerifiedContractsVersion } from "../context/verifiedContracts";

export default function ExtrinsicParametersDisplay({
  extrinsic,
  title,
  className,
}) {
  const [tableData, setTableData] = useState();
  const [jsonData, setJsonData] = useState();
  const verifiedContractsVersion = useVerifiedContractsVersion();

  useEffect(() => {
    if (!extrinsic) {
      return;
    }
    const { section, method, args = [] } = extrinsic?.call || extrinsic;
    setTableData(convertArgsForTableView(args, section, method));
    setJsonData(convertArgsForJsonView(args, section, method));
  }, [extrinsic, verifiedContractsVersion]);

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
