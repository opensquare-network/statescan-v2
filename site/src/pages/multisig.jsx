import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { useMemo } from "react";
import { currencify } from "../utils";
import DetailLayout from "../components/layout/detailLayout";
import { toExtrinsicDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHandles";
import {
  multisigDetailSelector,
  multisigFetchDetail,
  clearMultisigDetail,
} from "../store/reducers/multisigSlice";
import DetailTabs from "../components/detail/tabs";
import useChainSettings from "../utils/hooks/chain/useChainSettings";
import ExtrinsicParametersDisplay from "../components/extrinsicParametersDisplay";

export default function MultisigPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const multisig = useSelector(multisigDetailSelector);
  const { modules } = useChainSettings();

  const listData = useMemo(
    () =>
      multisig
        ? toExtrinsicDetailItem(multisig, {
            modules,
          })
        : {},
    [multisig, modules],
  );

  const tabs = [
    {
      name: "timeline",
      count: multisig?.eventsCount,
      children: <div>timeline</div>,
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
                multisig?.indexer?.multisigIndex ?? ""
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
        <ExtrinsicParametersDisplay extrinsic={multisig} title="Parameters" />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
