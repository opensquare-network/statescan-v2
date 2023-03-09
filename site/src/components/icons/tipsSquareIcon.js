import styled from "styled-components";
import { ReactComponent as TipsSquare } from "./tips-square.svg";

const TipsSquareIcon = styled(TipsSquare)`
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

export default TipsSquareIcon;
