import { useParams } from "react-router-dom";

export function useRecoverableParams() {
  const { id, ...rest } = useParams();
  const [address, height] = id.split("-");

  return { address, height: Number(height), ...rest };
}
