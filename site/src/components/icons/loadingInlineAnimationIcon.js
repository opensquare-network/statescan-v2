import styled from "styled-components";

import { ReactComponent as LoadingInlineAnimation } from "./loading-inline-animation.svg";

const LoadingInlineAnimationIcon = styled(LoadingInlineAnimation)`
  path {
    stroke: ${(p) => p.theme.fontTertiary};
  }
`;

export default LoadingInlineAnimationIcon;
