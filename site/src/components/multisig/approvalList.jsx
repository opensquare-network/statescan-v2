import { useMultisigData } from "../../hooks/multisig/useMultisigData";
import AddressesApprovalList from "../detail/addressesApprovalList";

export default function MultisigApprovalList() {
  const { data: { multisig } = {} } = useMultisigData();

  return (
    <AddressesApprovalList
      addresses={multisig?.signatories}
      approvals={multisig?.approvals}
    />
  );
}
