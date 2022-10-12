import styled from "styled-components";
import { ReactComponent as TransferSquare } from "./transfer-square.svg";

const TransferSquareIcon = styled(TransferSquare)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }

  linearGradient {
    stop:first-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }

    stop:last-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }
  }
`;

export default TransferSquareIcon;
