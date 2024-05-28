import styled from "styled-components";
import { ReactComponent as DataRecoverable } from "@icons/data-recoverable.svg";

const DataRecoverableIcon = styled(DataRecoverable)`
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

export default DataRecoverableIcon;
