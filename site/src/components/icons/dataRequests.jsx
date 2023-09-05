import styled from "styled-components";
import { ReactComponent as DataRequests } from "./data-requests.svg";

const DataRequestsIcon = styled(DataRequests)`
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

export default DataRequestsIcon;
