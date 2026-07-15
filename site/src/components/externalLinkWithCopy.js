import styled from "styled-components";
import ExternalLink from "./externalLink";
import { withCopy } from "../HOC/withCopy";
import { Inter_14_500 } from "../styles/text";

export const StyledExternalLink = styled(ExternalLink)`
  color: ${(p) => p.theme.theme500};
  text-decoration: none;
  word-break: break-all;
  cursor: pointer;
  ${Inter_14_500};
`;

const ExternalLinkWithCopy = withCopy(StyledExternalLink);

export default ExternalLinkWithCopy;
