import { stakingValidatorsHead } from "../../../utils/constants";
import AddressOrIdentity from "../../../components/address";
import Table from "../../../components/table";
import Tooltip from "../../../components/tooltip";
import ValueDisplay from "../../../components/displayValue";
import { toPrecision } from "@osn/common";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";

export default function StakingValidatorsTable({ data = [], loading }) {
  const { decimals, symbol } = useChainSettings();

  const tableData = data?.map?.((validator, index) => {
    return [
      <Tooltip key={`validator-${index}`} tip={validator.address}>
        <AddressOrIdentity address={validator.address} />
      </Tooltip>,
      <span key={`commission-${index}`}>
        {(parseFloat(validator.commission) / 10000000).toFixed(2)}%
      </span>,
      <span key={`nominators-${index}`}>{validator.nominator_count}</span>,
      <ValueDisplay
        key={`validator-self-stake-${index}`}
        value={toPrecision(validator.self_stake, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
      <ValueDisplay
        key={`total-stake-${index}`}
        value={toPrecision(validator.total_stake, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
      <span key={`active-${index}`}>{validator?.active ? "Yes" : "No"}</span>,
    ];
  });

  return (
    <Table heads={stakingValidatorsHead} data={tableData} loading={loading} />
  );
}