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
    return <Placeholder />;
  }

  return <IconComponent />;
}
