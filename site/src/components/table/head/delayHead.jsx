import styled from "styled-components";
import { Inter_12_600 } from "../../../styles/text";
import { delayColumnType } from "../../../utils/constants";
import { Flex } from "../../styled/flex";

const Wrapper = styled(Flex)`
  color: ${(p) => p.theme.theme500};
  color: var(--theme500);
  user-select: none;
  ${Inter_12_600};
`;

const Cell = styled.div`
  cursor: pointer;
`;

export default function DelayHead({ delayType, setDelayType }) {
  return (
    <Wrapper>
      {delayType === delayColumnType.blocks && (
        <Cell onClick={() => setDelayType(delayColumnType.time)}>
          Delay Blocks
        </Cell>
      )}
      {delayType === delayColumnType.time && (
        <Cell onClick={() => setDelayType(delayColumnType.blocks)}>
          Delay Time
        </Cell>
      )}
    </Wrapper>
  );
}
