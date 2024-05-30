import { useParams } from "react-router-dom";
import { useQueryParams } from "../useQueryParams";

export function useRecoveryParams() {
  const { id, ...rest } = useParams();
  const { page = 1 } = useQueryParams();
  const [address, rescuer, height] = id.split("-");

  return { address, rescuer, height: Number(height), page, ...rest };
}
