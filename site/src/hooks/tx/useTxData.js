import { useParams } from "react-router-dom";
import { useAsync } from "react-use";
import api from "../../services/api";

export function useTxData() {
  const { id = "" } = useParams();

  const { value, loading } = useAsync(async () => {
    const resp = await api.fetch(`/txs/${id}`);
    return resp?.result;
  }, [id]);

  return {
    data: value,
    loading,
  };
}
