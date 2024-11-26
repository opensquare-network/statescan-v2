import { useParams } from "react-router-dom";
import { useAsync } from "react-use";
import api from "../../services/api";
import { useEffect } from "react";
import {
  clearHttpError,
  handleApiError,
} from "../../utils/viewFuncs/errorHandles";
import { useDispatch } from "react-redux";

export function useTxData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  const { value, loading, error } = useAsync(async () => {
    const resp = await api.fetch(`/txs/${id}`);
    return resp?.result;
  }, [id]);

  useEffect(() => {
    if (error) {
      handleApiError(error, dispatch);
    }

    return () => {
      clearHttpError(dispatch);
    };
  }, [error]);

  return {
    data: value,
    loading,
  };
}
