import styled from "styled-components";
import { ReactComponent as HolderSquare } from "./holder-square.svg";

const HolderSquareIcon = styled(HolderSquare)`
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

export default HolderSquareIcon;
