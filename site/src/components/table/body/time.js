import styled from "styled-components";
import { timeTypes } from "../../../utils/constants";
import { time, timeDuration } from "../../../utils/viewFuncs/time";
import { Inter_14_500 } from "../../../styles/text";

const Wrapper = styled.span`
  white-space: nowrap;
  ${Inter_14_500};
  color: ${(p) => p.theme.fontTertiary};
`;

export default function TimeBody({ timeType, ts }) {
  return (
    <Wrapper>
      {timeType === timeTypes.date ? time(ts) : timeDuration(ts)}
    </Wrapper>
  );
}
