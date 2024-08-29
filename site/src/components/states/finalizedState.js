import { ReactComponent as CheckIcon } from "../icons/check.svg";
import { ReactComponent as TimerIcon } from "../icons/timer.svg";
import React from "react";
import { useSelector } from "react-redux";
import { finalizedHeightSelector } from "../../store/reducers/chainSlice";

export default function FinalizedState({ height }) {
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const isFinalized = height <= finalizedHeight;
  return isFinalized ? <CheckIcon /> : <TimerIcon />;
}
