import styled from "styled-components";
import { ReactComponent as DataSubIdentity } from "./data-sub-identity.svg";

const DataSubIdentityIcon = styled(DataSubIdentity)`
  path {
    fill: ${({ theme }) => theme.fontTertiary};
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

export default DataSubIdentityIcon;
