import styled from "styled-components";
import { timeTypes } from "../../../utils/constants";
import { time, timeDuration } from "../../../utils/viewFuncs/time";
import { Inter_14_500 } from "../../../styles/text";
import Tooltip from "../../tooltip";

const Wrapper = styled.span`
  white-space: nowrap;
  ${Inter_14_500};
  color: ${(p) => p.theme.fontTertiary};
`;

export default function TimeBody({ timeType, ts }) {
  return (
    <Wrapper>
      {timeType === timeTypes.date ? (
        <Tooltip tip={timeDuration(ts)}>{time(ts)}</Tooltip>
      ) : (
        <Tooltip tip={time(ts)}>{timeDuration(ts)}</Tooltip>
      )}
    </Wrapper>
  );
}
