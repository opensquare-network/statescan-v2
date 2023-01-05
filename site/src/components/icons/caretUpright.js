import styled from "styled-components";
import { ReactComponent as CaretUpright } from "./caret-upright.svg";

const CaretUprightIcon = styled(CaretUpright)`
  path {
    stroke: ${(p) => p.theme.fontTertiary};
  }
`;

export default CaretUprightIcon;
