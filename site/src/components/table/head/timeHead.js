import { timeTypes } from "../../../utils/constants";
import { Flex } from "../../styled/flex";
import styled from "styled-components";

const Wrapper = styled(Flex)`
  font-size: 14px;
  line-height: 16px;
  color: rgba(17, 17, 17, 0.35);
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
