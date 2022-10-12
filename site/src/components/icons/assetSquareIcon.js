import styled from "styled-components";
import { ReactComponent as AssetSquare } from "./asset-square.svg";

const AssetSquareIcon = styled(AssetSquare)`
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

export default AssetSquareIcon;
