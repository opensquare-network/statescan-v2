import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React from "react";
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

const TabWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid var(--strokeBase);
  background: var(--fillPanel);
  box-shadow: var(--shadowPanel);
`;

export default function MultisigPage() {
  const { data: { multisig } = {} } = useMultisigData();

  const listData = useMemo(() => toMultisigDetailItem(multisig), [multisig]);

  const tabs = [
    {
      name: "timeline",
      children: (
        <TabWrapper>
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
