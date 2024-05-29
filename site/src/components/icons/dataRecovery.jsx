import styled from "styled-components";
import { ReactComponent as DataRecovery } from "./data-recovery.svg";

const DataRecoveryIcon = styled(DataRecovery)`
  path {
    fill: var(--fontTertiary);
  }

  linearGradient {
    stop:first-child {
      stop-color: var(--fontPrimary);
    }

    stop:last-child {
      stop-color: var(--fontPrimary);
    }
  }
`;

export default DataRecoveryIcon;
