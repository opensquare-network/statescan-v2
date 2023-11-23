import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import List from "../components/list";
import { useMemo } from "react";
import { currencify } from "../utils";
import DetailLayout from "../components/layout/detailLayout";
import { toMultisigDetailItem } from "../utils/viewFuncs/toDetailItem";
import DetailTabs from "../components/detail/tabs";
import ExtrinsicParametersDisplay from "../components/extrinsicParametersDisplay";
import { useMultisigData } from "../hooks/multisig/useMultisigData";
import MultisigTimeline from "../components/multisig/timeline";
import styled from "styled-components";
import Divider from "../components/styled/divider";
import MultisigApprovalList from "../components/multisig/approvalList";
import { useDispatch } from "react-redux";
import { setErrorCode } from "../store/reducers/httpErrorSlice";
import { clearHttpError } from "../utils/viewFuncs/errorHandles";

const TabWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid var(--strokeBase);
  background: var(--fillPanel);
  box-shadow: var(--shadowPanel);
`;

export default function MultisigPage() {
  const { data: { multisig } = {} } = useMultisigData();
  const dispatch = useDispatch();
  useEffect(() => {
    if (multisig === null) {
      dispatch(setErrorCode(404));
    }

    return () => {
      clearHttpError(dispatch);
    };
  }, [dispatch, multisig]);

  const listData = useMemo(() => toMultisigDetailItem(multisig), [multisig]);

  const tabs = [
    {
      name: "timeline",
      children: (
        <TabWrapper>
          <MultisigApprovalList />
          <Divider />
          <MultisigTimeline />
        </TabWrapper>
      ),
    },
  ];

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
