import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { useMemo } from "react";
import { currencify } from "../utils";
import DetailLayout from "../components/layout/detailLayout";
import { toMultisigDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHandles";
import {
  multisigFetchDetail,
  clearMultisigDetail,
} from "../store/reducers/multisigSlice";
import DetailTabs from "../components/detail/tabs";
import ExtrinsicParametersDisplay from "../components/extrinsicParametersDisplay";
import { useMultisigData } from "../hooks/multisig/useMultisigData";
import MultisigTimeline from "../components/multisig/timeline";

export default function MultisigPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: { multisig } = {} } = useMultisigData();

  const listData = useMemo(() => toMultisigDetailItem(multisig), [multisig]);

  const tabs = [
    {
      name: "timeline",
      children: <MultisigTimeline />,
    },
  ];

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      dispatch(multisigFetchDetail(id)).catch((e) =>
        handleApiError(e, dispatch),
      );
    }

    return () => {
      dispatch(clearMultisigDetail());
    };
  }, [id, dispatch]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Multisigs", path: "/multisigs" },
        {
          name: multisig
            ? `${currencify(multisig?.indexer?.blockHeight)}-${
                multisig?.indexer?.extrinsicIndex ?? ""
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
        {multisig?.call && (
          <ExtrinsicParametersDisplay extrinsic={multisig} title="Parameters" />
        )}
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
