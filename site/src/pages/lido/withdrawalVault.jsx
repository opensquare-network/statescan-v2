import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import EvmPagination from "../../components/lido/evmPagination";
import EvmTxHash from "../../components/lido/evmTxHash";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import { useLidoWithdrawalVaultFilter } from "../../hooks/filter/useLidoWithdrawalVaultFilter";
import { useLidoWithdrawalVaultData } from "../../hooks/lido/useLidoWithdrawalVaultData";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";

const lidoWithdrawalVaultHead = [
  {
    name: "Block",
    width: 160,
  },
  {
    name: "Time",
    type: "time",
    width: 180,
  },
  { name: "Tx Hash", width: 220 },
  {
    name: "Amount",
    align: "right",
    width: 180,
  },
];

function toLidoWithdrawalVaultTableData(items = [], { decimals, symbol }) {
  return items.map((item) => [
    <EvmExternalLink
      href={getEtherscanBlockUrl(item.blockNumber)}
      key={`${item.id}-block`}
      copy={false}
    >
      {toLidoBlockNumber(item.blockNumber)}
    </EvmExternalLink>,
    toLidoTimestamp(item.blockTime),
    <EvmTxHash key={`${item.id}-tx`} txHash={item.txHash} copy={false} />,
    <ValueDisplay
      key={`${item.id}-amount`}
      value={toLidoAmount(item.amount, decimals)}
      symbol={symbol}
      showNotEqualTooltip
    />,
  ]);
}

export default function LidoWithdrawalVault() {
  const filter = useLidoWithdrawalVaultFilter();
  const chainSettings = useChainSettings();
  const { data, loading } = useLidoWithdrawalVaultData();
  const tableData = toLidoWithdrawalVaultTableData(data?.items, chainSettings);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Withdrawal Vault" }]} />

      <Filter data={filter} />

      <StyledPanelTableWrapper
        footer={<EvmPagination nextCursor={data?.nextCursor} />}
      >
        <Table
          heads={lidoWithdrawalVaultHead}
          data={tableData}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
