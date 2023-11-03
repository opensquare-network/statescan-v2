import { useEffect, useState } from "react";
import {
  convertArgsForJsonView,
  convertArgsForTableView,
} from "../utils/dataTransformer";
import DataDisplay from "./dataDisplay";

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
    const { section, method, args } = extrinsic.call || extrinsic;
    setTableData(convertArgsForTableView(args, section, method));
    setJsonData(convertArgsForJsonView(args, section, method));
  }, [extrinsic]);

  return (
    <DataDisplay
      tableData={tableData}
      JSONData={jsonData}
      title={title}
      className={className}
    />
  );
}
