import { Flex } from "../styled/flex";
import { Tag, TagThemed } from "../tag";
import { getContractName, parseReviveCall } from "../../utils/revive";

export default function MethodCell({ call }) {
  if (!call) {
    return "--";
  }

  if (call.section === "revive" && call.method === "call") {
    const { dest, calldata } = parseReviveCall(call);
    const name = getContractName(dest);
    const evmMethod = calldata.functionName ?? calldata.selector;

    if (name) {
      return (
        <Flex gap={4} style={{ flexWrap: "wrap" }}>
          <Tag>{name}</Tag>
          {evmMethod && <TagThemed>{evmMethod}</TagThemed>}
        </Flex>
      );
    }

    if (evmMethod) {
      return <TagThemed>{evmMethod}</TagThemed>;
    }
  }

  return <Tag>{call.method}</Tag>;
}
