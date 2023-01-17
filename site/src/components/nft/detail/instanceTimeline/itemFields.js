import maybeHexToUft8 from "../../../../utils/hex";
import AddressOrIdentity from "../../../address/index";
import TimelineItemFields from "../../../timeline/itemFields";
import { Text } from "../../../timeline/styled";

function getFields(timelineItem) {
  switch (timelineItem.name) {
    case "Issued":
    case "Burned": {
      const { classId, instanceId, owner } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        "Instance ID": <Text>{`#${instanceId}`}</Text>,
        Owner: <AddressOrIdentity ellipsis={false} address={owner} />,
      };
    }
    case "MetadataSet": {
      const { classId, instanceId, data, isFrozen } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        "Instance ID": <Text>{`#${instanceId}`}</Text>,
        Data: <Text>{maybeHexToUft8(data)}</Text>,
        Frozen: <Text>{isFrozen ? "Yes" : "No"}</Text>,
      };
    }
    case "Transferred": {
      const { classId, instanceId, from, to } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        "Instance ID": <Text>{`#${instanceId}`}</Text>,
        From: <AddressOrIdentity ellipsis={false} address={from} />,
        To: <AddressOrIdentity ellipsis={false} address={to} />,
      };
    }
    case "ApprovedTransfer":
    case "ApprovalCancelled": {
      const { classId, instanceId, owner, delegate } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        "Instance ID": <Text>{`#${instanceId}`}</Text>,
        Owner: <AddressOrIdentity ellipsis={false} address={owner} />,
        Delegate: <AddressOrIdentity ellipsis={false} address={delegate} />,
      };
    }
    default: {
      const { classId, instanceId } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        "Instance ID": <Text>{`#${instanceId}`}</Text>,
      };
    }
  }
}

export default function NftInstanceTimelineItemFields({ item }) {
  const fields = Object.entries(getFields(item));
  return <TimelineItemFields fields={fields} />;
}
