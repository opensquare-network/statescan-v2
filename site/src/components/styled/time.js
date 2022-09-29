import { Flex } from "./flex";
import { time, timeDuration } from "../../utils/viewFuncs/time";
import React from "react";
import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";

const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

const TextTertiary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontTertiary};
`;

export function DetailedTime({ ts }) {
  return (
    <Flex style={{ gap: 8 }}>
      <TextSecondary>{time(ts)}</TextSecondary>
      <TextTertiary>{timeDuration(ts)}</TextTertiary>
    </Flex>
  );
}
