import styled from "styled-components";
import DetailedBlock from "../../../detail/block";
import List from "../../../list";
import { Overpass_Mono_14_500 } from "../../../../styles/text";
import { PROXY_ANNOUNCEMENT_STATUS } from "../../../../utils/constants";
import { PROXY_ANNOUNCEMENT_STATUS_COLORS } from "../../consts";
import { TagThemed } from "../../../tag";
import { TextTertiary } from "../../../styled/text";
import { Flex } from "../../../styled/flex";
import { time } from "../../../../utils/viewFuncs/time";

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
      value: <CallHash>{callHash}</CallHash>,
    },
    {
      label: "Created At",
      value: (
        <Flex gap={8}>
          <DetailedBlock blockHeight={indexer?.blockHeight} />
          <TextTertiary>{time(indexer?.blockTime)}</TextTertiary>
        </Flex>
      ),
    },
    {
      label: "Normalized Call",
      value: normalizedCall?.method ? (
        <TagThemed>{normalizedCall.method}</TagThemed>
      ) : (
        <TextTertiary>--</TextTertiary>
      ),
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
      value: (
        <Flex gap={8}>
          <DetailedBlock blockHeight={finalIndexer?.blockHeight} />
          <TextTertiary>{time(finalIndexer?.blockTime)}</TextTertiary>
        </Flex>
      ),
    },
  ].filter(Boolean);

  return <List data={loading ? [] : data} />;
}
