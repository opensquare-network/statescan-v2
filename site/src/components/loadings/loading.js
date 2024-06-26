import React from "react";
import styled from "styled-components";
import LoadingIcon from "../icons/loadingIcon";
import { Flex } from "../styled/flex";

const Wrapper = styled(Flex)`
  justify-content: center;
  padding: 64px;
`;

export default function Loading({ children, ...props }) {
  return (
    <Wrapper {...props} className={`loading ${props.className}`}>
      <LoadingIcon />
      {children}
    </Wrapper>
  );
}
