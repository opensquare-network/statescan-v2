import { ReactComponent as CheckIcon } from "../icons/check.svg";
import { ReactComponent as TimerIcon } from "../icons/timer.svg";
import React from "react";

export default function FinalizedState({ finalized }) {
  return finalized ? <CheckIcon /> : <TimerIcon />;
}
