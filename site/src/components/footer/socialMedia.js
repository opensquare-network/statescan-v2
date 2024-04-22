import styled from "styled-components";

import { ReactComponent as Github } from "./github.svg";
import { ReactComponent as X } from "./x.svg";
import { ReactComponent as Element } from "./element.svg";
import { gap_x } from "../../styles/tailwindcss";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  ${gap_x(16)};
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  svg * {
    fill: ${(p) => p.theme.fontTertiary};
  }

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
        <Github width={20} height={20} />
      </Link>
      <Link
        href="https://twitter.com/OpensquareN"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <X width={20} height={20} />
      </Link>
      <Link
        href="https://app.element.io/#/room/#opensquare:matrix.org"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <Element width={20} height={20} />
      </Link>
    </Wrapper>
  );
}
