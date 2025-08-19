import styled from "styled-components";
import { ReactComponent as ReferendaDeciding } from "./referenda-deciding.svg";

const ReferendaDecidingIcon = styled(ReferendaDeciding)`
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

export default ReferendaDecidingIcon;
