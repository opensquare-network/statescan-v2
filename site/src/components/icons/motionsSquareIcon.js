import styled from "styled-components";
import { ReactComponent as MotionsSquare } from "./motions-square.svg";

const MotionsSquareIcon = styled(MotionsSquare)`
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

export default MotionsSquareIcon;
