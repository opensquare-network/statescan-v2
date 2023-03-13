import styled from "styled-components";
import { ReactComponent as FellowshipSquare } from "./fellowship-square.svg";

const FellowshipSquareIcon = styled(FellowshipSquare)`
  path {
    fill: ${({ theme }) => theme.fontTertiary};
    fill-opacity: 1;
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
