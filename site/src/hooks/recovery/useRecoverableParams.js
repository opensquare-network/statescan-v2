import { useParams } from "react-router-dom";
import { useQueryParams } from "../useQueryParams";

export function useRecoverableParams() {
  const { id, ...rest } = useParams();
  const { page = 1, ...q } = useQueryParams();
  const [address, height] = id.split("-");

  return { address, height: Number(height), page, ...q, ...rest };
}
