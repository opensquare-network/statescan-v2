import styled from "styled-components";
import { Tag } from "../tag";
import Tooltip from "../tooltip";
import Link from "../styled/link";
import { Overpass_Mono_14_500 } from "../../styles/text";
import { getContractName } from "../../utils/revive";

const MonoLink = styled(Link)`
  ${Overpass_Mono_14_500};
  word-break: break-all;
`;

// The label of a contract touched by a revive call, it leads to the contract
// page. A known contract shows its name only, the address is in the tooltip.
export default function ContractLabel({ address }) {
  if (!address) {
    return null;
  }

  const name = getContractName(address);
  const to = `/contracts/${address}`;

  if (!name) {
    return (
      <Tooltip tip={address}>
        <MonoLink to={to}>{address}</MonoLink>
      </Tooltip>
    );
  }

  return (
    <Tooltip tip={address}>
      <Link to={to}>
        <Tag>{name}</Tag>
      </Link>
    </Tooltip>
  );
}
