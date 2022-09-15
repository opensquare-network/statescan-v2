import styled from "styled-components";
import { Link as RouteLink } from "react-router-dom";

const Link = styled(RouteLink)`
  color: ${(props) => props.theme.fontPrimary};
  text-decoration: none;
`;

export default Link;
