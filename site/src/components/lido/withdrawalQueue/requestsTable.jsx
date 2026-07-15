import { LIDO_WITHDRAWAL_STATUS } from "../../../utils/constants";
import { LidoWithdrawalsTable } from "../../../pages/lido/withdrawals";

const requestsFilters = {
  status: LIDO_WITHDRAWAL_STATUS.REQUEST,
};

export default function LidoWithdrawalQueueRequestsTable() {
  return <LidoWithdrawalsTable filters={requestsFilters} />;
}
