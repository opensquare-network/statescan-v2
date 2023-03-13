import styled from "styled-components";
import { ReactComponent as FellowshipSquare } from "./fellowship-square.svg";

const FellowshipSquareIcon = styled(FellowshipSquare)`
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

export default FellowshipSquareIcon;
