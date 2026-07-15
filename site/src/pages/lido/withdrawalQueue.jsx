import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import LidoWithdrawalQueueFinalizationsTable from "../../components/lido/withdrawalQueue/finalizationsTable";
import LidoWithdrawalQueueRequestsTable from "../../components/lido/withdrawalQueue/requestsTable";
import LidoWithdrawalQueueSummary from "../../components/lido/withdrawalQueue/summary";
import { useLidoServerQuery } from "../../hooks/lido/useLidoQuery";
import { GET_LIDO_WITHDRAWAL_QUEUE_TOTALS } from "../../services/gql/lido";
import { LIDO_WITHDRAWAL_STATUS } from "../../utils/constants";

export default function LidoWithdrawalQueue() {
  const breadCrumb = <BreadCrumb data={[{ name: "Withdrawal Queue" }]} />;
  const { data: totals } = useLidoServerQuery(
    GET_LIDO_WITHDRAWAL_QUEUE_TOTALS,
    {
      variables: {
        requestStatus: LIDO_WITHDRAWAL_STATUS.REQUEST,
      },
    },
  );
  const tabs = [
    {
      name: "Requests",
      value: "requests",
      count: totals?.withdrawals?.total,
      children: <LidoWithdrawalQueueRequestsTable />,
    },
    {
      name: "Finalizations",
      value: "finalizations",
      count: totals?.withdrawalFinalized?.total,
      children: <LidoWithdrawalQueueFinalizationsTable />,
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoWithdrawalQueueSummary />
      <DetailTabs tabs={tabs} resetPage={false} />
    </DetailLayout>
  );
}
