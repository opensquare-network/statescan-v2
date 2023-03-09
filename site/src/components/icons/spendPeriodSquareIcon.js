import styled from "styled-components";
import { ReactComponent as SpendPeriodSquare } from "./spend-period-square.svg";

const SpendPeriodSquareIcon = styled(SpendPeriodSquare)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
    stroke-opacity: 1;
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

export default SpendPeriodSquareIcon;
