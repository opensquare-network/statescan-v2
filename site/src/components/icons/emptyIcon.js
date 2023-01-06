import styled from "styled-components";
import { ReactComponent as Empty } from "./empty.svg";

const EmptyIcon = styled(Empty)`
  path {
    fill: ${(p) => p.theme.fontQuaternary};
  }
`;

export default EmptyIcon;
