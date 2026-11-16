import styled from "styled-components";
import { TagThemed } from "../tag";
import { Overpass_Mono_12_400 } from "../../styles/text";
import { decodeEvmCalldata } from "../../utils/revive";

const Mono = styled.span`
  ${Overpass_Mono_12_400};
  word-break: break-all;
`;

// The method a revive call reached; the selector is shown when the abi of the
// callee is unknown. The arguments are in the expandable data table.
export default function ContractCallMethod({ call }) {
  const calldata = decodeEvmCalldata(call?.data, call?.dest);

  if (!calldata.functionName) {
    return <Mono>{calldata.selector ?? call?.methodHash ?? "--"}</Mono>;
  }

  return <TagThemed>{calldata.functionName}</TagThemed>;
}
