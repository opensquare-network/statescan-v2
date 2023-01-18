import Timeline from "../../../timeline";
import NftClassTimelineItemFields from "./itemFields";
import NftClassTimelineItemIcon from "./itemIcon";

export default function NftClassTimeline({ nft, timeline, loading }) {
  return (
    <Timeline
      data={nft}
      timeline={timeline}
      loading={loading}
      IconComponent={NftClassTimelineItemIcon}
      FieldsComponent={NftClassTimelineItemFields}
    />
  );
}
