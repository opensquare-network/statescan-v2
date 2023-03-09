import styled from "styled-components";
import { ReactComponent as OpenGovSquare } from "./opengov-square.svg";

const OpenGovSquareIcon = styled(OpenGovSquare)`
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

export default OpenGovSquareIcon;
