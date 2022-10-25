import styled from "styled-components";
import { ReactComponent } from "./extrinsics-square.svg";

const ExtrinsicsSquareIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
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

export default ExtrinsicsSquareIcon;
