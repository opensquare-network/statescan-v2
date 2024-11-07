import { useDispatch } from "react-redux";
import useOverview from "./overview/useOverview";
import { useEffect } from "react";
import { setFinalizedHeight } from "../store/reducers/chainSlice";

export default function useSetFinalizedHeight() {
  const dispatch = useDispatch();
  const { overview } = useOverview();
  useEffect(() => {
    dispatch(setFinalizedHeight(overview?.finalizedHeight));
  }, [dispatch, overview?.finalizedHeight]);
}
