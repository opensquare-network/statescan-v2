import Timeline from "../../timeline";
import AssetTimelineItemFields from "./itemFields";
import AssetTimelineItemIcon from "./itemIcon";

export default function AssetTimeline({ asset, timeline, loading }) {
  return (
    <Timeline
      data={asset}
      timeline={timeline}
      loading={loading}
      IconComponent={AssetTimelineItemIcon}
      FieldsComponent={AssetTimelineItemFields}
    />
  );
}
