import styled from "styled-components";
import { Inter_12_400 } from "../../styles/text";
import { Flex } from "../styled/flex";
import { Link as RouteLink } from "react-router-dom";
import CaretUprightIcon from "../icons/caretUpright";

const Wrapper = styled(Flex)`
  cursor: pointer;
  ${Inter_12_400}
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${(p) => p.theme.fillAlpha};
  color: ${(p) => p.theme.fontSecondary};
  > :nth-child(2) {
    margin-left: 4px;
  }
  svg path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
  &:hover {
    color: ${(p) => p.theme.fontPrimary};
    svg path {
      stroke-opacity: 0.5;
    }
  }
`;

const MyLink = styled(RouteLink)`
  text-decoration: none;
`;

export default function Link({ name, to }) {
  return (
    <MyLink to={to}>
      <Wrapper>
        <div>{name}</div>
        <CaretUprightIcon />
      </Wrapper>
    </MyLink>
  );
}
