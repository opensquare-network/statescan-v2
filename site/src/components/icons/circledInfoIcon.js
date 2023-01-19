import styled from "styled-components";
import { ReactComponent as CircledInfo } from "./circled-info.svg";

const CircledInfoIcon = styled(CircledInfo)`
  path {
    stroke-opacity: 1;
    stroke: ${(p) => p.theme.fontTertiary};
  }
`;

export default CircledInfoIcon;
