import styled from "styled-components";
import { ReactComponent as DataIdentity } from "./data-identity.svg";

const DataIdentityIcon = styled(DataIdentity)`
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

export default DataIdentityIcon;
