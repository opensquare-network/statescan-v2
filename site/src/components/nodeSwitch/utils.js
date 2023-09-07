export function getDelayType(delay) {
  let delayType = "Unavailable";
  if (delay) {
    if (delay >= 300) {
      delayType = "Slow";
    } else if (delay >= 100) {
      delayType = "Medium";
    } else if (delay >= 0) {
      delayType = "Fast";
    }
  }
  return delayType;
}
