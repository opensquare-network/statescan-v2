import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { useTxData } from "../hooks/tx/useTxData";
import TxEvmDetailPanel from "../components/tx/evmDetailPanel";
import TxSubstrateDetailPanel from "../components/tx/substrateDetailPanel";
import { useSelector } from "react-redux";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";
import { useMemo } from "react";

export default function TXPage() {
  const finalizedHeight = useSelector(finalizedHeightSelector);

  const breadCrumb = <BreadCrumb data={[{ name: "Transaction" }]} />;
  const { data } = useTxData();

  let content;
  if (data?.isEvm) {
    const isFinalized = data?.blockNumber <= finalizedHeight;
    content = <TxEvmDetailPanel data={{ ...data, isFinalized }} />;
  } else {
    const isFinalized = data?.indexer?.blockHeight <= finalizedHeight;
    content = <TxSubstrateDetailPanel data={{ ...data, isFinalized }} />;
  }

  return <DetailLayout breadCrumb={breadCrumb}>{content}</DetailLayout>;
}
