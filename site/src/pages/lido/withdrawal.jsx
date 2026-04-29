import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import List from "../../components/list";
import Loading from "../../components/loadings/loading";
import ExternalLinkWithCopy from "../../components/externalLinkWithCopy";
import LidoRequestId from "../../components/lido/requestId";
import LidoStatus from "../../components/lido/status";
import EvmTxHash from "../../components/lido/evmTxHash";
import LidoValue from "../../components/lido/value";
import LidoWithdrawalTimeline from "../../components/lido/withdrawalTimeline";
import NoData from "../../components/noData";
import { Panel } from "../../components/styled/panel";
import { DetailedTime } from "../../components/styled/time";
import { useLidoWithdrawalData } from "../../hooks/lido/useLidoWithdrawalData";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  getEtherscanBlockUrl,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";

const TabPanel = styled(Panel)`
  padding: 24px;
`;

function toBlockLink(blockNumber) {
  if (!blockNumber) {
    return "--";
  }

  return (
    <ExternalLinkWithCopy href={getEtherscanBlockUrl(blockNumber)}>
      {toLidoBlockNumber(blockNumber)}
    </ExternalLinkWithCopy>
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
      value: <LidoRequestId requestId={withdrawal.id} />,
    },
    { label: "Block", value: toBlockLink(withdrawal.blockNumber) },
    { label: "Time", value: toTime(withdrawal.blockTime) },
    {
      label: "Tx Hash",
      value: <EvmTxHash txHash={withdrawal.txHash} />,
    },
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
        <LidoValue value={withdrawal.shares} decimals={decimals} symbol="" />
      ),
    },
    { label: "Status", value: <LidoStatus status={withdrawal.status} /> },
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
          <LidoWithdrawalTimeline withdrawal={data} />
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
