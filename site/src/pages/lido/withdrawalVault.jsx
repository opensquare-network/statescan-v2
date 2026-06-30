import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmExternalLink from "../../components/lido/evmExternalLink";
import EvmTxHash from "../../components/lido/evmTxHash";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import { useLidoWithdrawalVaultFilter } from "../../hooks/filter/useLidoWithdrawalVaultFilter";
import { useLidoWithdrawalVaultData } from "../../hooks/lido/useLidoWithdrawalVaultData";
import { useQueryParams } from "../../hooks/useQueryParams";
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
    width: 200,
  },
  { name: "Tx Hash", width: 220 },
  {
    name: "Amount",
    align: "right",
    width: 180,
  },
];

function toLidoWithdrawalVaultTableData(items = [], { decimals, symbol }) {
  return items.map((item) => {
    const rowKey = [item.indexer?.txHash, item.indexer?.logIndex]
      .filter(Boolean)
      .join("-");

    return [
      <EvmExternalLink
        href={getEtherscanBlockUrl(item.indexer?.blockNumber)}
        key={`${rowKey}-block`}
        copy={false}
      >
        {toLidoBlockNumber(item.indexer?.blockNumber)}
      </EvmExternalLink>,
      toLidoTimestamp(item.indexer?.blockTimestamp),
      <EvmTxHash
        key={`${rowKey}-tx`}
        txHash={item.indexer?.txHash}
        copy={false}
      />,
      <ValueDisplay
        key={`${rowKey}-amount`}
        value={toLidoAmount(item.amount, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
    ];
  });
}

export default function LidoWithdrawalVault() {
  const filter = useLidoWithdrawalVaultFilter();
  const chainSettings = useChainSettings();
  const { page = 1 } = useQueryParams();
  const { data, loading } = useLidoWithdrawalVaultData();
  const tableData = toLidoWithdrawalVaultTableData(data?.items, chainSettings);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Consensus Layer Withdrawal Vault" }]} />

      <Filter data={filter} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={data?.limit}
            total={data?.total}
          />
        }
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
