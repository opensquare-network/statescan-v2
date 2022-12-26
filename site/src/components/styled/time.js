import { Flex } from "./flex";
import { time, timeDuration } from "../../utils/viewFuncs/time";
import React from "react";
import { TextSecondary, TextTertiary } from "./text";

export function DetailedTime({ ts }) {
  return (
    <Flex style={{ gap: 8 }}>
      <TextSecondary>{time(ts)}</TextSecondary>
      <TextTertiary>{timeDuration(ts)}</TextTertiary>
    </Flex>
  );
}
