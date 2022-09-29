import { timeTypes } from "../../../utils/constants";
import { Flex } from "../../styled/flex";
import styled from "styled-components";

const Wrapper = styled(Flex)`
  font-size: 14px;
  line-height: 16px;
  color: ${(p) => p.theme.theme500};
  user-select: none;
`;

const Item = styled.div`
  cursor: pointer;
`;

export default function TimeHead({ timeType, setTimeType }) {
  return (
    <Wrapper>
      {timeType === timeTypes.date ? (
        <Item onClick={() => setTimeType(timeTypes.age)}>Date Time</Item>
      ) : (
        <Item onClick={() => setTimeType(timeTypes.date)}>Age</Item>
      )}
    </Wrapper>
  );
}
