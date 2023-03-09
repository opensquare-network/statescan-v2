import styled from "styled-components";
import { ReactComponent as NextBurnSquare } from "./next-burn-square.svg";

const NextBurnSquareIcon = styled(NextBurnSquare)`
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

export default NextBurnSquareIcon;
