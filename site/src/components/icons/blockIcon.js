import styled from "styled-components";
import { ReactComponent as Block } from "./block.svg";

const BlockIcon = styled(Block)`
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

export default BlockIcon;
