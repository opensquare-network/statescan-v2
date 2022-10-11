import styled from "styled-components";
import { Link as RouteLink } from "react-router-dom";
import { SF_Mono_12_500, SF_Mono_14_500 } from "../../styles/text";

const Link = styled(RouteLink)`
  color: ${(props) => props.theme.fontPrimary};
  text-decoration: none;
`;

export default Link;

export const ColoredLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
`;

export const ColoredMonoLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
  ${SF_Mono_14_500};
  word-break: break-all;
  cursor: pointer;
`;

export const ColoredMonoLinkSmall = styled(ColoredMonoLink)`
  ${SF_Mono_12_500};
`;
