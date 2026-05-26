import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import EvmPagination from "../../components/lido/evmPagination";
import EvmTxHash from "../../components/lido/evmTxHash";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import { useLidoRewardsVaultFilter } from "../../hooks/filter/useLidoRewardsVaultFilter";
import { useLidoRewardsVaultData } from "../../hooks/lido/useLidoRewardsVaultData";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  getEtherscanBlockUrl,
  toLidoAmount,
  toLidoBlockNumber,
  toLidoTimestamp,
} from "../../utils/viewFuncs/lido";

const lidoRewardsVaultHead = [
  {
    name: "Block",
    width: 160,
  },
  {
    name: "Time",
    type: "time",
    width: 200,
  },
  { name: "Tx Hash", width: 220 },
  {
    name: "Amount",
    align: "right",
    width: 180,
  },
];

function toLidoRewardsVaultTableData(items = [], { decimals, symbol }) {
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

export default function LidoRewardsVault() {
  const filter = useLidoRewardsVaultFilter();
  const chainSettings = useChainSettings();
  const { data, loading } = useLidoRewardsVaultData();
  const tableData = toLidoRewardsVaultTableData(data?.items, chainSettings);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Exection Layer Rewards Vault" }]} />

      <Filter data={filter} />

      <StyledPanelTableWrapper
        footer={<EvmPagination nextCursor={data?.nextCursor} />}
      >
        <Table
          heads={lidoRewardsVaultHead}
          data={tableData}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
