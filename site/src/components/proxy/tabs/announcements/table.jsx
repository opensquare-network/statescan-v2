import { Link } from "react-router-dom";
import {
  PROXY_ANNOUNCEMENT_STATUS,
  proxyAnnouncementsHead,
} from "../../../../utils/constants";
import { hashEllipsis } from "../../../../utils/viewFuncs/text";
import Table from "../../../table";
import CallCell from "../../../table/callCell";
import FoldButton from "../../../table/body/row/foldButton";

const StatusCellColor = {
  [PROXY_ANNOUNCEMENT_STATUS.ANNOUNCED]: "var(--fillActiveBlue)",
  [PROXY_ANNOUNCEMENT_STATUS.EXECUTED]: "var(--fillPositive)",
  [PROXY_ANNOUNCEMENT_STATUS.KILLED]: "var(--fillNegative)",
  [PROXY_ANNOUNCEMENT_STATUS.REJECTED]: "var(--fillNegative)",
  [PROXY_ANNOUNCEMENT_STATUS.REMOVED]: "var(--fillNegative)",
};

export default function ProxyAnnouncementsTable({ data, loading }) {
  const tableData = data?.map?.((item) => {
    let finalIndexer;
    if (item.state === PROXY_ANNOUNCEMENT_STATUS.EXECUTED) {
      finalIndexer = item.executedAt;
    } else if (item.state === PROXY_ANNOUNCEMENT_STATUS.REJECTED) {
      finalIndexer = item.rejectedAt;
    } else if (item.state === PROXY_ANNOUNCEMENT_STATUS.REMOVED) {
      finalIndexer = item.removedAt;
    }
    // TODO: proxy, killed?
    else if (item.state === PROXY_ANNOUNCEMENT_STATUS.KILLED) {
    }

    return [
      hashEllipsis(item.callHash, 6, 8),
      item.indexer?.blockTime,
      <CallCell call={item.normalizedCall} />,
      <span style={{ color: StatusCellColor[item.state] }}>{item.state}</span>,
      finalIndexer?.blockTime,
      <Link to={`/proxy/announcements/${item.announcementId}`}>
        <FoldButton fold />
      </Link>,
    ];
  });

  return (
    <Table heads={proxyAnnouncementsHead} data={tableData} loading={loading} />
  );
}
