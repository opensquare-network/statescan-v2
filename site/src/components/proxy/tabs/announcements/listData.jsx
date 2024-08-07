import styled from "styled-components";
import DetailedBlock from "../../../detail/block";
import List from "../../../list";
import { Overpass_Mono_14_500 } from "../../../../styles/text";
import { PROXY_ANNOUNCEMENT_STATUS } from "../../../../utils/constants";
import { PROXY_ANNOUNCEMENT_STATUS_COLORS } from "../../consts";
import CallCell from "../../../table/callCell";

const CallHash = styled.div`
  ${Overpass_Mono_14_500}
`;

export default function ProxyAnnouncementListData({
  loading,
  callHash,
  indexer,
  normalizedCall,
  status,
  removedAt,
  executedAt,
  rejectedAt,
}) {
  let finalIndexer;
  if (status === PROXY_ANNOUNCEMENT_STATUS.EXECUTED) {
    finalIndexer = executedAt;
  } else if (status === PROXY_ANNOUNCEMENT_STATUS.REJECTED) {
    finalIndexer = rejectedAt;
  } else if (status === PROXY_ANNOUNCEMENT_STATUS.REMOVED) {
    finalIndexer = removedAt;
  }
  // TODO: proxy, killed?
  else if (status === PROXY_ANNOUNCEMENT_STATUS.KILLED) {
  }

  const data = [
    {
      label: "Call Hash",
      // TODO: proxy, call hash link?
      value: <CallHash>{callHash}</CallHash>,
    },
    {
      label: "Created At",
      value: <DetailedBlock blockHeight={indexer?.blockHeight} />,
    },
    {
      label: "Normalized Call",
      value: <CallCell call={normalizedCall} />,
    },
    {
      type: "divider",
    },
    {
      label: "Status",
      value: (
        <div style={{ color: PROXY_ANNOUNCEMENT_STATUS_COLORS[status] }}>
          {status}
        </div>
      ),
    },
    finalIndexer && {
      label: `${status} At`,
      value: <DetailedBlock blockHeight={finalIndexer?.blockHeight} />,
    },
  ].filter(Boolean);

  return <List data={loading ? [] : data} />;
}
