import styled from "styled-components";
import Tooltip from "../tooltip";
import { FlexColumn } from "../styled/flex";
import { Tag, TagThemed } from "../tag";
import { getContractName, parseReviveCall } from "../../utils/revive";

const Wrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

// Decoded EVM call of a `revive.call`, shown under the substrate call.
function getReviveDetail(call) {
  if (call.section !== "revive" || call.method !== "call") {
    return null;
  }

  const { dest, calldata } = parseReviveCall(call);
  const name = getContractName(dest);
  const evmMethod = calldata.functionName ?? calldata.selector;

  if (!name && !evmMethod) {
    return null;
  }

  return { name, evmMethod };
}

export default function CallCell({ call }) {
  if (!call) {
    return "--";
  }

  const text = `${call.section}(${call.method})`;
  const detail = getReviveDetail(call);

  if (!detail) {
    return (
      <Tooltip tip={text}>
        <Wrapper>{text}</Wrapper>
      </Tooltip>
    );
  }

  return (
    <Tooltip tip={text}>
      <FlexColumn>
        <Wrapper>{text}</Wrapper>
        <Detail>
          {detail.name && <Tag>{detail.name}</Tag>}
          {detail.evmMethod && <TagThemed>{detail.evmMethod}</TagThemed>}
        </Detail>
      </FlexColumn>
    </Tooltip>
  );
}
