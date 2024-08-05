import isNil from "lodash.isnil";
import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";
import { delayColumnType } from "../../../utils/constants";
import { useChainBlockTime } from "../../../utils/hooks/chain/useChainBlockTime";
import { timeRemain } from "../../../utils/viewFuncs/time";

const Wrapper = styled.span`
  white-space: nowrap;
  ${Inter_14_500};
`;

export default function DelayBody({ delayType, blocks }) {
  const blockTime = useChainBlockTime();
  const ms = (blocks || 0) * blockTime;

  if (isNil(blocks)) {
    return null;
  }

  if (blocks <= 0) {
    return <Wrapper style={{ color: "var(--fontTertiary)" }}>-</Wrapper>;
  }

  return (
    <Wrapper>
      {delayType === delayColumnType.blocks
        ? blocks?.toLocaleString?.()
        : timeRemain(ms)}
    </Wrapper>
  );
}
