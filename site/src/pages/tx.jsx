import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { useTxData } from "../hooks/tx/useTxData";
import TxEvmDetailContent from "../components/tx/evmDetailContent";
import TxSubstrateDetailContent from "../components/tx/substrateDetailContent";
import { hashEllipsis } from "../utils/viewFuncs/text";
import { useParams } from "react-router-dom";
import { Panel } from "../components/styled/panel";
import Loading from "../components/loadings/loading";

export default function TXPage() {
  const { id = "" } = useParams();

  const { data, loading } = useTxData();
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
  if (loading) {
    content = (
      <Panel>
        <Loading />
      </Panel>
    );
  } else {
    if (data?.isEvm) {
      content = <TxEvmDetailContent data={data} loading={loading} />;
    } else {
      content = <TxSubstrateDetailContent data={data} />;
    }
  }

  return <DetailLayout breadCrumb={breadCrumb}>{content}</DetailLayout>;
}
