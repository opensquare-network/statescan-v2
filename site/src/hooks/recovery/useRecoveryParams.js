import { useParams } from "react-router-dom";

export function useRecoveryParams() {
  const { id, ...rest } = useParams();
  const [address, rescuer, height] = id.split("-");

  return { address, rescuer, height: Number(height), ...rest };
}
