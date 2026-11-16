import styled from "styled-components";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import List from "../../components/list";
import Loading from "../../components/loadings/loading";
import EvmAddress from "../../components/lido/evmAddress";
import {
  EarnDetailBreadcrumb,
  EarnTime,
} from "../../components/lido/earn/common";
import {
  EarnDetailAssetValue,
  EarnDetailSharesValue,
} from "../../components/lido/earn/value";
import LidoEarnStatus from "../../components/lido/earn/status";
import LidoEarnDepositTimeline from "../../components/lido/earn/depositTimeline";
import NoData from "../../components/noData";
import { Panel } from "../../components/styled/panel";
import { useLidoEarnVaultDepositData } from "../../hooks/lido/useLidoEarnData";
import { hashEllipsis } from "../../utils/viewFuncs/text";

const TabPanel = styled(Panel)`
  padding: 24px;
`;

function toEarnDepositDetailItems(deposit) {
  return [
    { label: "ID", value: hashEllipsis(deposit.id) },
    {
      label: "Amount",
      value: (
        <EarnDetailAssetValue value={deposit.assets} asset={deposit.asset} />
      ),
    },
    {
      label: "Shares",
      value: <EarnDetailSharesValue value={deposit.shares} />,
    },
    {
      label: "Time",
      value: <EarnTime time={deposit.indexer?.blockTimestamp} />,
    },
    { label: "Status", value: <LidoEarnStatus status={deposit.status} /> },
    {
      label: "Account",
      value: <EvmAddress address={deposit.account} />,
    },
  ].filter(Boolean);
}

export default function LidoEarnDeposit() {
  const { data, loading } = useLidoEarnVaultDepositData();
  const breadCrumb = (
    <EarnDetailBreadcrumb
      detailName="Deposit"
      id={data?.id}
      tabName="Deposits"
      vault={data?.vault}
    />
  );

  if (loading) {
    return (
      <DetailLayout breadCrumb={breadCrumb}>
        <Panel>
          <Loading />
        </Panel>
      </DetailLayout>
    );
  }

  if (!data) {
    return (
      <DetailLayout breadCrumb={breadCrumb}>
        <Panel>
          <NoData />
        </Panel>
      </DetailLayout>
    );
  }

  const tabs = [
    {
      name: "Timeline",
      children: (
        <TabPanel>
          <LidoEarnDepositTimeline deposit={data} />
        </TabPanel>
      ),
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={toEarnDepositDetailItems(data)} />
      </Panel>

      <DetailTabs tabs={tabs} resetPage={false} />
    </DetailLayout>
  );
}
