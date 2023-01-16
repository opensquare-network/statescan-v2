import styled from "styled-components";
import { Flex } from "../styled/flex";
import { ReactComponent as ClockSVG } from "./clock.svg";
import { time, timeDuration } from "../../utils/viewFuncs/time";
import { Inter_12_400 } from "../../styles/text";

const Wrapper = styled(Flex)`
  > :nth-child(1) {
    margin-right: 4px;
  }
  > :nth-child(2) {
    margin-right: 8px;
  }
`;

const ClockIcon = styled(ClockSVG)`
  path {
    fill: ${(p) => p.theme.fontPrimary};
  }
`;

const Date = styled.div`
  white-space: nowrap;
  ${Inter_12_400}
  color: ${(p) => p.theme.fontSecondary};
`;

const Duration = styled.div`
  white-space: nowrap;
  ${Inter_12_400}
  color: ${(p) => p.theme.fontTertiary};
`;

export default function BlockTime({ ts }) {
  return (
    <Wrapper>
      <ClockIcon />
      <Date>{time(ts)}</Date>
      <Duration>{timeDuration(ts)}</Duration>
    </Wrapper>
  );
}
