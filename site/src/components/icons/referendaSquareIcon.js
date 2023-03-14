import styled from "styled-components";
import { ReactComponent as ReferendaSquare } from "./referenda-square.svg";

const ReferendaSquareIcon = styled(ReferendaSquare)`
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

export default ReferendaSquareIcon;
