import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";
import { delayColumnType } from "../../../utils/constants";

const Wrapper = styled.span`
  white-space: nowrap;
  ${Inter_14_500};
  color: var(--fontTertiary);
`;

export default function DelayBody({ delayType, blocks }) {
  return (
    <Wrapper>
      {delayType === delayColumnType.blocks
        ? blocks?.toLocaleString?.()
        : // TODO: proxy, blocktime for each chain settings
          ""}
    </Wrapper>
  );
}
