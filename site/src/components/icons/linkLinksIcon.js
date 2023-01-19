import styled from "styled-components";
import { ReactComponent as LinkLinks } from "./link-links.svg";

const LinkLinksIcon = styled(LinkLinks)`
  path {
    fill: ${(p) => p.theme.fontPrimary};
  }
`;

export default LinkLinksIcon;
