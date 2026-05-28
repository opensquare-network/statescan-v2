import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import LidoWithdrawalQueueFinalizationsTable from "../../components/lido/withdrawalQueue/finalizationsTable";
import LidoWithdrawalQueueSummary from "../../components/lido/withdrawalQueue/summary";

export default function LidoWithdrawalQueue() {
  const breadCrumb = <BreadCrumb data={[{ name: "Withdrawal Queue" }]} />;
  const tabs = [
    {
      name: "Finalizations",
      value: "finalizations",
      children: <LidoWithdrawalQueueFinalizationsTable />,
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <LidoWithdrawalQueueSummary />
      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
