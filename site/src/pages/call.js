import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import { toCallDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHandles";
import DetailLayout from "../components/layout/detailLayout";
import {
  callDetailSelector,
  callFetchDetail,
  resetCallDetail,
} from "../store/reducers/callSlice";
import ExtrinsicParametersDisplay from "../components/extrinsicParametersDisplay";

function Call() {
  const { id } = useParams();
  const call = useSelector(callDetailSelector);
  const dispatch = useDispatch();
  const { indexer, method, section } = call ?? {};

  const listData = useMemo(
    () => (call ? toCallDetailItem(indexer, method, section) : {}),
    [call, indexer, method, section],
  );

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      dispatch(callFetchDetail(id)).catch((e) => handleApiError(e, dispatch));
    }

    return () => {
      dispatch(resetCallDetail());
    };
  }, [id, dispatch]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Calls", path: "/calls" },
        {
          name: call
            ? `${call?.indexer?.blockHeight.toLocaleString()}-${
                call?.indexer?.callIndex
              }`
            : "...",
        },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
        {call && (
          <ExtrinsicParametersDisplay extrinsic={{ call }} title="Parameters" />
        )}
      </Panel>
    </DetailLayout>
  );
}

export default Call;
