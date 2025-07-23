import styled from "styled-components";
import { ReactComponent as ReferendaConfirming } from "./referenda-confirming.svg";

const ReferendaConfirmingIcon = styled(ReferendaConfirming)`
  path {
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

export default ReferendaConfirmingIcon;
