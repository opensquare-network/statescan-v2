import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { Panel } from "../components/styled/panel";
import {
  clearRuntimeDetail,
  runtimeDetailSelector,
  runtimeFetchDetail,
} from "../store/reducers/runtimeSlice";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHandles";

export default function Runtime() {
  const { runtimeSlug } = useParams();
  const [version, startHeight] = runtimeSlug.split("_");

  const dispatch = useDispatch();
  const runtime = useSelector(runtimeDetailSelector);

  useEffect(() => {
    if (version && startHeight) {
      clearHttpError(dispatch);
      dispatch(runtimeFetchDetail(version, startHeight)).catch((e) =>
        handleApiError(e, dispatch),
      );
    }

    return () => {
      dispatch(clearRuntimeDetail());
    };
  }, [version, dispatch, startHeight]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Runtimes", path: "/runtimes" },
        {
          name: runtime ? version : "...",
        },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel></Panel>
    </DetailLayout>
  );
}
