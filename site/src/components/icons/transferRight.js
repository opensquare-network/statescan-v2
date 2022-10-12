import styled from "styled-components";
import { ReactComponent as TransferRight } from "./transfer-right.svg";

const TransferRightIcon = styled(TransferRight)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default TransferRightIcon;
