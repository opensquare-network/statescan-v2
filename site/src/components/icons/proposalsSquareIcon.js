import styled from "styled-components";
import { ReactComponent as ProposalsSquare } from "./proposals-square.svg";

const ProposalsSquareIcon = styled(ProposalsSquare)`
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

export default ProposalsSquareIcon;
