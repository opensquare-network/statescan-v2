import { Link } from "react-router-dom";
import {
  PROXY_ANNOUNCEMENT_STATUS,
  proxyAnnouncementsHead,
} from "../../../../utils/constants";
import { hashEllipsis } from "../../../../utils/viewFuncs/text";
import Table from "../../../table";
import CallCell from "../../../table/callCell";
import FoldButton from "../../../table/body/row/foldButton";
import { PROXY_ANNOUNCEMENT_STATUS_COLORS } from "../../consts";
import DetailedBlock from "../../../detail/block";
import { TextTertiary } from "../../../styled/text";
import { time } from "../../../../utils/viewFuncs/time";
import styled from "styled-components";
import { Overpass_Mono_14_500 } from "../../../../styles/text";

const Hash = styled.div`
  ${Overpass_Mono_14_500}
`;

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

    return [
      <Hash>{hashEllipsis(item.callHash, 6, 8)}</Hash>,
      [
        <DetailedBlock blockHeight={item?.indexer?.blockHeight} />,
        <TextTertiary>{time(item?.indexer?.blockTime)}</TextTertiary>,
      ],
      <CallCell call={item.normalizedCall} />,
      <span style={{ color: PROXY_ANNOUNCEMENT_STATUS_COLORS[item.state] }}>
        {item.state}
      </span>,
      finalIndexer
        ? [
            <DetailedBlock blockHeight={finalIndexer?.blockHeight} />,
            <TextTertiary>{time(finalIndexer?.blockTime)}</TextTertiary>,
          ]
        : [<TextTertiary>--</TextTertiary>, <TextTertiary>--</TextTertiary>],
      <Link to={`/proxy/announcements/${item.announcementId}`}>
        <FoldButton fold />
      </Link>,
    ];
  });

  return (
    <Table heads={proxyAnnouncementsHead} data={tableData} loading={loading} />
  );
}
