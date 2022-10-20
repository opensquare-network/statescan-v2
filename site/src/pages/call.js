import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import api from "../services/api";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import DataDisplay from "../components/dataDisplay";
import { toCallDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHeandles";
import DetailLayout from "../components/layout/detailLayout";

function Call() {
  const { id } = useParams();
  const [call, setCall] = useState(null);
  const [list, setList] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }
    clearHttpError(dispatch);
    api
      .fetch(`/calls/${id}`)
      .then(({ result: data }) => {
        setCall(data);
        const { indexer, method, section } = data ?? {};
        setList(toCallDetailItem(indexer, method, section));
      })
      .catch((e) => handleApiError(e, dispatch));
  }, [id]);

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
        <List data={list} />
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
