import { useLidoOperatorFeeDistributedsData } from "../../../hooks/lido/useLidoOperatorFeeDistributedsData";
import LidoOperatorFeeDistributedsTable from "../operatorFeeDistributeds/table";

export default function LidoNodeOperatorFeeDistributeds({ nodeOperatorId }) {
  const { data, loading } = useLidoOperatorFeeDistributedsData(nodeOperatorId);

  return <LidoOperatorFeeDistributedsTable data={data} loading={loading} />;
}
