import styled from "styled-components";
import { ReactComponent as BountiesSquare } from "./bounties-square.svg";

const BountiesSquareIcon = styled(BountiesSquare)`
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

export default BountiesSquareIcon;
