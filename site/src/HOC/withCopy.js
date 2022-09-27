import { Flex } from "../components/styled/flex";
import { Inter_12_600 } from "../styles/text";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import React from "react";

const CopyButton = styled.button`
  all: unset;
  margin-left: 8px;
  padding: 2px 6px;
  color: ${({ theme }) => theme.fontSecondary};
  background: ${({ theme }) => theme.fillBub};
  border-radius: 4px;
  ${Inter_12_600};
  cursor: pointer;
`;

export const withCopy = (Component) => {
  return ({ children, ...restProps }) => {
    const [copied, setCopied] = React.useState(false);
    return (
      <Flex>
        <Component {...restProps}>{children}</Component>
        <CopyButton
          onClick={() => {
            copy(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </CopyButton>
      </Flex>
    );
  };
};
