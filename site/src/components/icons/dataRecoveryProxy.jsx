import styled from "styled-components";
import { ReactComponent as DataRecoveryProxy } from "@icons/data-proxy.svg";

const DataRecoveryProxyIcon = styled(DataRecoveryProxy)`
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

export default DataRecoveryProxyIcon;
