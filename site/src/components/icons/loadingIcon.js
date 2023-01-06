import styled from "styled-components";
import { ReactComponent as Loading } from "./loading.svg";

const LoadingIcon = styled(Loading)`
  ellipse:nth-child(2),
  ellipse:nth-child(4) {
    fill: ${(p) => p.theme.fontTertiary};
  }

  ellipse:nth-child(3),
  ellipse:nth-child(5) {
    fill: ${(p) => p.theme.fontQuaternary};
  }
`;

export default LoadingIcon;
