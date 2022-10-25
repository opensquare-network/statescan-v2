import styled from "styled-components";
import { ReactComponent } from "./finalized-block-square.svg";

const FinalizedBlockSquareIcon = styled(ReactComponent)`
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

export default FinalizedBlockSquareIcon;
