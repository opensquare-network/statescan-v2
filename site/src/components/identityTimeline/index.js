import Timeline from "../timeline";
import IdentityTimelineItemFields from "./itemFields";
import IdentityTimelineItemIcon from "./itemIcon";

export default function IdentityTimelineList({ identity, timeline, loading }) {
  return (
    <Timeline
      data={identity}
      timeline={timeline}
      loading={loading}
      IconComponent={IdentityTimelineItemIcon}
      FieldsComponent={IdentityTimelineItemFields}
    />
  );
}
