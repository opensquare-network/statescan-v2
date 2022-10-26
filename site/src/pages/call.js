import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import DataDisplay from "../components/dataDisplay";
import { toCallDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHeandles";
import DetailLayout from "../components/layout/detailLayout";
import {
  callDetailSelector,
  callFetchDetail,
  resetCallDetail,
} from "../store/reducers/callSlice";

function Call() {
  const { id } = useParams();
  const call = useSelector(callDetailSelector);
  const dispatch = useDispatch();
  const { indexer, method, section } = call ?? {};

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
        <List data={toCallDetailItem(indexer, method, section)} />
        <DataDisplay
          title="Attributes"
          tableData={call?.args}
          JSONData={call}
        />
      </Panel>
    </DetailLayout>
  );
}

export default Call;
