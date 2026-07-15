import { timeTypes } from "../../../utils/constants";
import { Flex } from "../../styled/flex";
import styled from "styled-components";
import { Inter_12_600 } from "../../../styles/text";

const Wrapper = styled(Flex)`
  color: ${(p) => p.theme.theme500};
  user-select: none;
  ${Inter_12_600};
`;

const Item = styled.div`
  cursor: pointer;
`;

export default function TimeHead({ labels, timeType, setTimeType }) {
  const displayLabel =
    timeType === timeTypes.date ? labels?.time || "Time" : labels?.age || "Age";

  return (
    <Wrapper>
      {timeType === timeTypes.date ? (
        <Item onClick={() => setTimeType(timeTypes.age)}>{displayLabel}</Item>
      ) : (
        <Item onClick={() => setTimeType(timeTypes.date)}>{displayLabel}</Item>
      )}
    </Wrapper>
  );
}
