import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { useTxData } from "../hooks/tx/useTxData";
import TxEvmDetailPanel from "../components/tx/evmDetailPanel";
import TxSubstrateDetailPanel from "../components/tx/substrateDetailPanel";

export default function TXPage() {
  const breadCrumb = <BreadCrumb data={[{ name: "Transaction" }]} />;
  const { data } = useTxData();

  let content;
  if (data?.isEvm) {
    content = <TxEvmDetailPanel data={data} />;
  } else {
    content = <TxSubstrateDetailPanel data={data} />;
  }

  return <DetailLayout breadCrumb={breadCrumb}>{content}</DetailLayout>;
}
