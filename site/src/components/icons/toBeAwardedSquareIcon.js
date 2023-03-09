import styled from "styled-components";
import { ReactComponent as ToBeAwardedSquare } from "./to-be-awarded-square.svg";

const ToBeAwardedSquareIcon = styled(ToBeAwardedSquare)`
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

export default ToBeAwardedSquareIcon;
