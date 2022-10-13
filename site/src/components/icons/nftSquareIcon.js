import styled from "styled-components";
import { ReactComponent as NftSquare } from "./nft-square.svg";

const NftSquareIcon = styled(NftSquare)`
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

export default NftSquareIcon;
