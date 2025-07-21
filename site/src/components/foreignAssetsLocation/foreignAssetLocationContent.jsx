import { useState, useEffect } from "react";
import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";
import DataDisplay from "../dataDisplay";
import {
  convertLocationForTableView,
  convertLocationForJsonView,
} from "./convert";
import { bg_theme } from "../../styles/tailwindcss";

const LocationContent = styled.div`
  padding: 16px;
  ${bg_theme("fillBase")}
  margin-top: 0;
  padding: 24px;
`;

const LocationItem = styled.div`
  ${Inter_14_500};
  color: var(--fontSecondary);
  margin-bottom: 8px;
  word-break: break-all;
`;

export default function ForeignAssetLocationContent({ location, style = {} }) {
  const [tableData, setTableData] = useState();
  const [jsonData, setJsonData] = useState();

  useEffect(() => {
    if (!location) {
      return;
    }
    setTableData(convertLocationForTableView(location));
    setJsonData(convertLocationForJsonView(location));
  }, [location]);

  if (!location) {
    return <LocationItem>No Data</LocationItem>;
  }

  return (
    <LocationContent style={{ ...style }}>
      <DataDisplay tableData={tableData} JSONData={jsonData} />
    </LocationContent>
  );
}
