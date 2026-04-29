import styled from "styled-components";
import ExternalLink from "../externalLink";
import { withCopy } from "../../HOC/withCopy";

const LidoEtherscanLink = styled(ExternalLink)`
  color: ${(p) => p.theme.theme500};
  text-decoration: none;
  word-break: break-all;

  :hover {
    text-decoration: underline;
  }
`;

export const LidoEtherscanLinkWithCopy = withCopy(LidoEtherscanLink);

export default LidoEtherscanLink;
