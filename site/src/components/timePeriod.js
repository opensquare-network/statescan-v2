import { extractTime } from "@polkadot/util";
import { Fragment } from "react";

function defaultRender(val) {
  return val;
}

export default function TimePeriod({
  ms = 0,
  renderValue = defaultRender,
  renderUnit = defaultRender,
}) {
  const time = extractTime(ms);
  const { days, hours, minutes, seconds } = time ?? {};

  const resolveUnit = (/** @type {number} */ n, /** @type {string} */ s) =>
    n > 1 ? `${s}s` : "";

  const timeValues = [
    { value: days, unit: resolveUnit(days, "day") },
    { value: hours, unit: resolveUnit(hours, "hr") },
    { value: minutes, unit: resolveUnit(minutes, "min") },
    { value: seconds, unit: "s" },
  ]
    .filter((i) => i.value)
    .slice(0, 2);

  return timeValues.map((item, idx) => {
    return (
      <Fragment key={idx}>
        {renderValue(item.value)} {renderUnit(item.unit)}{" "}
      </Fragment>
    );
  });
}
