import TimelineIcons from "../../icons/timeline";

export default function TimelineItemIcon({ name }) {
  const IconComponent = TimelineIcons[name];
  if (!IconComponent) {
    return null;
  }

  return <IconComponent />;
}
