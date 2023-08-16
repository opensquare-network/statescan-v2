import styled from "styled-components";
import { ReactComponent as PlaceholderSVG } from "../icons/timeline/placeholder.svg";

const Placeholder = styled(PlaceholderSVG)`
  path {
    stroke: ${(p) => p.theme.fontSecondary};
  }
`;

export default function TimelineItemIcon({ icons = {}, name }) {
  const IconComponent = icons[name];
  if (!IconComponent) {
    return <Placeholder width={24} height={24} />;
  }

  return <IconComponent width={24} height={24} />;
}
