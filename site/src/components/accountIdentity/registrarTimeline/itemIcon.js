import { RegistrarTimelineIcons } from "../timelineIcons";
import TimelineItemIcon from "../../timeline/itemIcon";

export default function RegistrarTimelineItemIcon({ name }) {
  return <TimelineItemIcon icons={RegistrarTimelineIcons} name={name} />;
}
