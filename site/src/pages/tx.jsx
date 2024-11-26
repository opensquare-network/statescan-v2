import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { useTxData } from "../hooks/tx/useTxData";
import TxEvmDetailPanel from "../components/tx/evmDetailPanel";
import TxSubstrateDetailContent from "../components/tx/substrateDetailContent";
import { useSelector } from "react-redux";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";
import { hashEllipsis } from "../utils/viewFuncs/text";
import { useParams } from "react-router-dom";

export default function TXPage() {
  const { id = "" } = useParams();
  const finalizedHeight = useSelector(finalizedHeightSelector);

  const { data } = useTxData();
  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Transaction" },
        {
          name: hashEllipsis(id),
        },
      ]}
    />
  );

  let content;
  if (data?.isEvm) {
    content = <TxEvmDetailPanel data={data} />;
  } else {
    content = <TxSubstrateDetailContent data={data} />;
  }

  return <DetailLayout breadCrumb={breadCrumb}>{content}</DetailLayout>;
}
