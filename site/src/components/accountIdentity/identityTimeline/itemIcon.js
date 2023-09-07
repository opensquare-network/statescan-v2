import { IdentityTimelineIcons } from "../timelineIcons";
import TimelineItemIcon from "../../timeline/itemIcon";

export default function IdentityTimelineItemIcon({ name }) {
  return <TimelineItemIcon icons={IdentityTimelineIcons} name={name} />;
}
