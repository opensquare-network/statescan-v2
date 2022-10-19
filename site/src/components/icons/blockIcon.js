import styled from "styled-components";
import { ReactComponent as Block } from "./block.svg";

const BlockIcon = styled(Block)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

export default BlockIcon;
