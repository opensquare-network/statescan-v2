import BigNumber from "bignumber.js";
import moment from "moment";
import { DetailedTime } from "../../styled/time";
import { FlexColumn } from "../../styled/flex";
import { StatusNegativeTag, StatusPositiveTag } from "../../tag";

function toFutureResumeTimestamp(timestamp) {
  if (!timestamp || timestamp === "0") {
    return null;
  }

  const timestampNumber = new BigNumber(timestamp);
  if (timestampNumber.gt(Number.MAX_SAFE_INTEGER)) {
    return null;
  }

  const timestampInSeconds = timestampNumber.toNumber();
  return moment.unix(timestampInSeconds).isAfter(moment())
    ? timestampInSeconds * 1000
    : null;
}

export default function WithdrawalQueueStatus({
  status,
  resumeSinceTimestamp,
  showResumeTime = false,
}) {
  if (!status) {
    return "--";
  }

  if (status === "Active") {
    return <StatusPositiveTag>{status}</StatusPositiveTag>;
  }

  if (status === "Paused") {
    const resumeTimestamp = showResumeTime
      ? toFutureResumeTimestamp(resumeSinceTimestamp)
      : null;

    if (!resumeTimestamp) {
      return <StatusNegativeTag>{status}</StatusNegativeTag>;
    }

    return (
      <FlexColumn gap={8}>
        <StatusNegativeTag>{status}</StatusNegativeTag>
        <DetailedTime ts={resumeTimestamp} />
      </FlexColumn>
    );
  }

  return status;
}
