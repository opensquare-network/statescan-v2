import styled from "styled-components";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import List from "../../components/list";
import Loading from "../../components/loadings/loading";
import EvmAddress from "../../components/lido/evmAddress";
import {
  EARN_SHARES_DECIMALS,
  EarnDetailBreadcrumb,
  EarnTime,
} from "../../components/lido/earn/common";
import {
  EarnDetailSharesValue,
  EarnDetailValue,
} from "../../components/lido/earn/value";
import LidoEarnStatus from "../../components/lido/earn/status";
import LidoEarnRedeemTimeline from "../../components/lido/earn/redeemTimeline";
import NoData from "../../components/noData";
import { Panel } from "../../components/styled/panel";
import { useLidoEarnVaultRedeemData } from "../../hooks/lido/useLidoEarnData";
import { hashEllipsis } from "../../utils/viewFuncs/text";

const TabPanel = styled(Panel)`
  padding: 24px;
`;

function toEarnRedeemDetailItems(redeem) {
  return [
    { label: "ID", value: hashEllipsis(redeem.id) },
    {
      label: "Amount",
      value: (
        <EarnDetailValue
          value={redeem.assets}
          decimals={EARN_SHARES_DECIMALS}
          symbol="wstETH"
        />
      ),
    },
    {
      label: "Shares",
      value: <EarnDetailSharesValue value={redeem.shares} />,
    },
    {
      label: "Time",
      value: <EarnTime time={redeem.indexer?.blockTimestamp} />,
    },
    { label: "Request Time", value: <EarnTime time={redeem.requestTime} /> },
    { label: "Status", value: <LidoEarnStatus status={redeem.status} /> },
    {
      label: "Account",
      value: <EvmAddress address={redeem.account} />,
    },
  ].filter(Boolean);
}

export default function LidoEarnRedeem() {
  const { data, loading } = useLidoEarnVaultRedeemData();
  const breadCrumb = (
    <EarnDetailBreadcrumb
      detailName="Redeem"
      id={data?.id}
      tabName="Redeems"
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
          <LidoEarnRedeemTimeline redeem={data} />
        </TabPanel>
      ),
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={toEarnRedeemDetailItems(data)} />
      </Panel>

      <DetailTabs tabs={tabs} resetPage={false} />
    </DetailLayout>
  );
}
