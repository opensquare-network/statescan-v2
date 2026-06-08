import { LIDO_WITHDRAWAL_STATUS } from "../../../utils/constants";
import { LidoWithdrawalsTable } from "../../../pages/lido/withdrawals";

const requestsFilters = {
  status_not: LIDO_WITHDRAWAL_STATUS.CLAIMED,
};

export default function LidoWithdrawalQueueRequestsTable() {
  return <LidoWithdrawalsTable filters={requestsFilters} />;
}
