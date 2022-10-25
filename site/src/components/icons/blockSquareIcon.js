import styled from "styled-components";
import { ReactComponent as BlockSquare } from "./block-square.svg";

const BlockSquareIcon = styled(BlockSquare)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }

  #paint0_linear_5874_7536 {
    stop:first-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }

    stop:last-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }
  }
`;

export default BlockSquareIcon;
