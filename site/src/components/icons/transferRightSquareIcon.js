import styled from "styled-components";
import { ReactComponent as TransferRightSquare } from "./transfer-right-square.svg";

const TransferRightSquareIcon = styled(TransferRightSquare)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default TransferRightSquareIcon;
