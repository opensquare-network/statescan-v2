import styled from "styled-components";

import { ReactComponent as Github } from "./github.svg";
import { ReactComponent as Twitter } from "./twitter.svg";
import { ReactComponent as Element } from "./element.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;

  &:hover {
    svg {
      * {
        fill-opacity: 0.35 !important;
      }
    }
  }
`;

export default function SocialMedia() {
  return (
    <Wrapper>
      <Link
        href="https://github.com/opensquare-network/"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <Github />
      </Link>
      <Link
        href="https://twitter.com/OpensquareN"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <Twitter />
      </Link>
      <Link
        href="https://app.element.io/#/room/#opensquare:matrix.org"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <Element />
      </Link>
    </Wrapper>
  );
}
