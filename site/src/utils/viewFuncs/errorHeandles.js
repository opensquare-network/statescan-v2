import { setErrorCode } from "../../store/reducers/httpErrorSlice";

export function handleApiError(e, dispatch) {
  if (e?.error?.status === 204 || e?.error?.status === 404) {
    dispatch(setErrorCode(404));
  } else {
    dispatch(setErrorCode(500));
  }
}

export function clearHttpError(dispatch) {
  dispatch && dispatch(setErrorCode(null));
}
