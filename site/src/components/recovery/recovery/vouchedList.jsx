import { useRecoveryData } from "../../../hooks/recovery/useRecoveryData";
import AddressesApprovalList from "../../detail/addressesApprovalList";

export default function RecoveryVouchedList() {
  const { data } = useRecoveryData();

  return (
    <AddressesApprovalList
      addresses={data?.allFriends}
      approvals={data?.friends}
    />
  );
}
