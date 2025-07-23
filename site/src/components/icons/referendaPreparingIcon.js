import styled from "styled-components";
import { ReactComponent as ReferendaPreparing } from "./referenda-preparing.svg";

const ReferendaPreparingIcon = styled(ReferendaPreparing)`
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

export default ReferendaPreparingIcon;
