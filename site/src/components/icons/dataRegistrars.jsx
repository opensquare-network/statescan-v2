import styled from "styled-components";
import { ReactComponent as DataRegistrars } from "./data-registrars.svg";

const DataRegistrarsIcon = styled(DataRegistrars)`
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

export default DataRegistrarsIcon;
