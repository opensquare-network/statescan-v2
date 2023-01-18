import maybeHexToUft8 from "../../../../utils/hex";
import AddressOrIdentity from "../../../address/index";
import TimelineItemFields from "../../../timeline/itemFields";
import { Text } from "../../../timeline/styled";

function getFields(timelineItem) {
  switch (timelineItem.name) {
    case "Created": {
      const { classId, creator, owner } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        Creator: <AddressOrIdentity ellipsis={false} address={creator} />,
        Owner: <AddressOrIdentity ellipsis={false} address={owner} />,
      };
    }
    case "ForceCreated": {
      const { classId, owner } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        Owner: <AddressOrIdentity ellipsis={false} address={owner} />,
      };
    }
    case "AssetStatusChanged": {
      const { classId, owner, issuer, admin, freezer, freeHolding, isFrozen } =
        timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        Owner: <AddressOrIdentity ellipsis={false} address={owner} />,
        Issuer: <AddressOrIdentity ellipsis={false} address={issuer} />,
        Admin: <AddressOrIdentity ellipsis={false} address={admin} />,
        Freezer: <AddressOrIdentity ellipsis={false} address={freezer} />,
        Frozen: <Text>{isFrozen ? "Yes" : "No"}</Text>,
        "Free holding": <Text>{freeHolding ? "Yes" : "No"}</Text>,
      };
    }
    case "TeamChanged": {
      const { classId, issuer, admin, freezer } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        Issuer: <AddressOrIdentity ellipsis={false} address={issuer} />,
        Admin: <AddressOrIdentity ellipsis={false} address={admin} />,
        Freezer: <AddressOrIdentity ellipsis={false} address={freezer} />,
      };
    }
    case "OwnerChanged": {
      const { classId, newOwner } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        "New owner": <AddressOrIdentity ellipsis={false} address={newOwner} />,
      };
    }
    case "ClassMetadataSet":
    case "CollectionMetadataSet": {
      const { classId, data, isFrozen } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        Data: <Text>{maybeHexToUft8(data)}</Text>,
        Frozen: <Text>{isFrozen ? "Yes" : "No"}</Text>,
      };
    }
    case "CollectionMaxSupplySet": {
      const { classId, maxSupply } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
        "Max supply": <Text>{maxSupply}</Text>,
      };
    }
    default: {
      const { classId } = timelineItem.args;
      return {
        "Class ID": <Text>{`#${classId}`}</Text>,
      };
    }
  }
}

export default function NftClassTimelineItemFields({ item }) {
  const fields = Object.entries(getFields(item));
  return <TimelineItemFields fields={fields} />;
}
