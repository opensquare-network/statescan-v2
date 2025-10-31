import { stakingNominationsHead } from "../../../utils/constants";
import AddressOrIdentity from "../../address";
import Table from "../../table";
import Tooltip from "../../tooltip";
import ValueDisplay from "../../displayValue";
import { toPrecision } from "@osn/common";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import BigNumber from "bignumber.js";
import { EmptyCell } from "../rewards/table";

function MyShareCell({ validator }) {
  if (
    BigNumber(validator?.nominator_stake).lte(0) ||
    BigNumber(validator?.total_stake).lte(0)
  ) {
    return <EmptyCell />;
  }

  const myShare = BigNumber(validator?.nominator_stake)
    .div(validator?.total_stake)
    .times(100);

  return <Tooltip tip={`${myShare}%`}>{myShare.toFixed(2)}%</Tooltip>;
}

export default function AccountStakingNominationsTable({ data = [], loading }) {
  const { decimals, symbol } = useChainSettings();

  const tableData = data?.map?.((validator, index) => {
    return [
      <Tooltip key={`validator-${index}`} tip={validator.address}>
        <AddressOrIdentity address={validator.address} />
      </Tooltip>,
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
      <span key={`nominators-${index}`}>{validator.nominator_count}</span>,
      <span key={`commission-${index}`}>
        {(parseFloat(validator.commission) / 10000000).toFixed(2)}%
      </span>,
      <MyShareCell validator={validator} key={`my-share-${index}`} />,
      <span key={`active-${index}`}>{validator?.active ? "Yes" : "No"}</span>,
    ];
  });

  return (
    <Table heads={stakingNominationsHead} data={tableData} loading={loading} />
  );
}
