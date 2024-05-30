import { Flex } from "../components/styled/flex";
import { Inter_12_600 } from "../styles/text";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import React from "react";

const Wrapper = styled(Flex)`
  @media screen and (min-width: 900px) {
    &:hover {
      button {
        display: flex;
      }
    }
  }
`;

const CopyButton = styled.button`
  all: unset;
  display: none;
  margin-left: 8px;
  padding: 2px 6px;
  color: ${({ theme }) => theme.fontSecondary};
  background: ${({ theme }) => theme.fillSub};
  border-radius: 4px;
  ${Inter_12_600};
  cursor: pointer;
  white-space: nowrap;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

function defaultRender(children) {
  return children;
}

export const withCopy = (Component) => {
  return ({ children, render = defaultRender, ...restProps }) => {
    const [copied, setCopied] = React.useState(false);

    const copyContent = React.Children.toArray(children).filter(
      (item) => typeof item === "string" || typeof item === "number",
    );

    return (
      <Wrapper>
        <Component {...restProps}>{render(children)}</Component>
        <CopyButton
          onClick={() => {
            copy(copyContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </CopyButton>
      </Wrapper>
    );
  };
};
