import styled from "styled-components";
import { Tag } from "../tag";
import Tooltip from "../tooltip";
import { Flex } from "../styled/flex";
import { Overpass_Mono_14_500 } from "../../styles/text";
import { withCopy } from "../../HOC/withCopy";
import { getContractName } from "../../utils/revive";

const Mono = styled.span`
  ${Overpass_Mono_14_500};
  word-break: break-all;
`;

const MonoWithCopy = withCopy(Mono);

export default function ContractLabel({ address, showAddress = false }) {
  if (!address) {
    return null;
  }

  const name = getContractName(address);

  if (!name) {
    return <MonoWithCopy>{address}</MonoWithCopy>;
  }

  if (showAddress) {
    return (
      <Flex gap={8} style={{ flexWrap: "wrap" }}>
        <Tag>{name}</Tag>
        <MonoWithCopy>{address}</MonoWithCopy>
      </Flex>
    );
  }

  return (
    <Tooltip tip={address}>
      <Tag>{name}</Tag>
    </Tooltip>
  );
}
