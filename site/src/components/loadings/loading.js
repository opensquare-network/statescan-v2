import { ReactComponent as LoadingSVG } from "../icons/loading.svg";
import { Flex } from "../styled/flex";
import React from "react";
import styled from "styled-components";

const LoadingIcon = styled(LoadingSVG)`
  ellipse:nth-child(2),
  ellipse:nth-child(4) {
    fill: ${(p) => p.theme.fontTertiary};
  }

  ellipse:nth-child(3),
  ellipse:nth-child(5) {
    fill: ${(p) => p.theme.fontQuaternary};
  }
`;

export default function Loading() {
  return (
    <Flex style={{ justifyContent: "center", padding: 64 }} className="loading">
      <LoadingIcon />
    </Flex>
  );
}
