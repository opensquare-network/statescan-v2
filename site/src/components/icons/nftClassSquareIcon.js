import styled from "styled-components";
import { ReactComponent as NftClassSquare } from "./nft-class-square.svg";

const NftClassSquareIcon = styled(NftClassSquare)`
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

export default NftClassSquareIcon;
