import styled from "styled-components";
import { ReactComponent as Transfers } from "./transfers.svg";

const TransfersIcon = styled(Transfers)`
  path {
    stroke: ${(p) => p.theme.fontTertiary};
  }
`;

export default TransfersIcon;
