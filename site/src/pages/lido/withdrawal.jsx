import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import List from "../../components/list";
import Loading from "../../components/loadings/loading";
import { LidoEtherscanLinkWithCopy } from "../../components/lido/etherscanLink";
import LidoStatus from "../../components/lido/status";
import LidoValue from "../../components/lido/value";
import LidoWithdrawalTimeline from "../../components/lido/withdrawalTimeline";
import NoData from "../../components/noData";
import { Panel } from "../../components/styled/panel";
import { DetailedTime } from "../../components/styled/time";
import { TextSecondary } from "../../components/styled/text";
import { useLidoWithdrawalData } from "../../hooks/lido";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  getEtherscanBlockUrl,
  getEtherscanTxUrl,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";
import { withCopy } from "../../HOC/withCopy";

const TabPanel = styled(Panel)`
  padding: 24px;
`;

const TextSecondaryWithCopy = withCopy(TextSecondary);

function toBlockLink(blockNumber) {
  if (!blockNumber) {
    return "--";
  }

  return (
    <LidoEtherscanLinkWithCopy
      href={getEtherscanBlockUrl(blockNumber)}
      render={toLidoBlockNumber}
    >
      {blockNumber}
    </LidoEtherscanLinkWithCopy>
  );
}

function toTxLink(txHash) {
  if (!txHash) {
    return "--";
  }

  return (
    <LidoEtherscanLinkWithCopy href={getEtherscanTxUrl(txHash)}>
      {txHash}
    </LidoEtherscanLinkWithCopy>
  );
}

function toTime(blockTime) {
  const timestamp = toLidoTimestamp(blockTime);
  return timestamp ? <DetailedTime ts={timestamp} /> : "--";
}

function toWithdrawalDetailItems(withdrawal, chainSettings) {
  const { decimals, symbol } = chainSettings;

  return [
    {
      label: "Request ID",
      value: <TextSecondaryWithCopy>{withdrawal.id}</TextSecondaryWithCopy>,
    },
    { label: "Block", value: toBlockLink(withdrawal.blockNumber) },
    { label: "Time", value: toTime(withdrawal.blockTime) },
    { label: "Tx Hash", value: toTxLink(withdrawal.txHash) },
    { label: "Status", value: <LidoStatus status={withdrawal.status} /> },
    {
      label: "Value",
      value: (
        <LidoValue
          value={withdrawal.value}
          decimals={decimals}
          symbol={symbol}
        />
      ),
    },
    {
      label: "Shares",
      value: (
        <LidoValue
          value={withdrawal.shares}
          decimals={decimals}
          symbol={symbol}
        />
      ),
    },
  ];
}

export default function LidoWithdrawal() {
  const { data, loading, requestId } = useLidoWithdrawalData();
  const chainSettings = useChainSettings();
  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Withdrawals", path: "/withdrawals" },
        { name: requestId },
      ]}
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
          <LidoWithdrawalTimeline
            withdrawal={data}
            chainSettings={chainSettings}
          />
        </TabPanel>
      ),
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={toWithdrawalDetailItems(data, chainSettings)} />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
