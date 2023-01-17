import Timeline from "../../../timeline";
import NftInstanceTimelineItemFields from "./itemFields";
import NftInstanceTimelineItemIcon from "./itemIcon";

export default function NftInstanceTimeline({ nft, timeline, loading }) {
  return (
    <Timeline
      data={nft}
      timeline={timeline}
      loading={loading}
      IconComponent={NftInstanceTimelineItemIcon}
      FieldsComponent={NftInstanceTimelineItemFields}
    />
  );
}
