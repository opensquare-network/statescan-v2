import { Inter_14_500, Inter_18_700 } from "../../styles/text";
import { ReactComponent as Icon404 } from "../icons/404.svg";
import { Panel } from "../styled/panel";
import styled from "styled-components";
import React from "react";

const StyledIcon404 = styled(Icon404)`
  path {
    fill: ${({ theme }) => theme.fontQuaternary};
    fill-opacity: 1;
  }
`;

const Wrapper = styled.div`
  text-align: center;
  padding-top: 72px;
  padding-bottom: 72px;

  p {
    margin: auto;
    max-width: 295px;
    ${Inter_14_500};
    color: ${({ theme }) => theme.fontTertiary};
  }
`;

const Headline = styled.h2`
  margin-top: 16px;
  margin-bottom: 8px;
  ${Inter_18_700};
  color: ${({ theme }) => theme.fontPrimary};
`;

function NotFoundError() {
  return (
    <Panel>
      <Wrapper>
        <StyledIcon404 />
        <Headline title="Page not found">Page not found</Headline>
        <p>You may have mistyped the url or the page may have moved.</p>
      </Wrapper>
    </Panel>
  );
}

export default NotFoundError;
