import styled from "styled-components";
import { ReactComponent as Transfer } from "./transfer.svg";

const TransferIcon = styled(Transfer)`
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

export default TransferIcon;
