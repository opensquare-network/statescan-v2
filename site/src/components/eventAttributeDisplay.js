import { useEffect, useState } from "react";
import { makeEventArgs } from "../utils/eventArgs";
import DataDisplay from "./dataDisplay";

export default function EventAttributeDisplay({ event, title = "Attributes" }) {
  const [tableData, setTableData] = useState();
  const [jsonData, setJsonData] = useState();

  useEffect(() => {
    if (!event) {
      return;
    }
    setTableData(makeEventArgs(event));
    setJsonData(event.args);
  }, [event]);

  return (
    <DataDisplay tableData={tableData} JSONData={jsonData} title={title} />
  );
}
