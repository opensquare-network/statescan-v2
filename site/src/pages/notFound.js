import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import { Inter_14_500, Inter_18_700 } from "../styles/text";
import { ReactComponent as Icon404 } from "../components/icons/404.svg";

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

function NotFound() {
  return (
    <Layout>
      <BreadCrumb data={[{ name: "Error" }]} />
      <Panel>
        <Wrapper>
          <StyledIcon404 />
          <Headline title="Page not found">Page not found</Headline>
          <p>You may have mistyped the url or the page may have moved.</p>
        </Wrapper>
      </Panel>
    </Layout>
  );
}

export default NotFound;
