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
    BigNumber(validator?.bonded).lte(0) ||
    BigNumber(validator?.bonded_nominators).lte(0)
  ) {
    return <EmptyCell />;
  }

  return (
    <span>
      {BigNumber(validator?.bonded)
        .div(validator?.bonded_nominators)
        .times(100)
        .toFixed(2)}
      %
    </span>
  );
}

export default function AccountStakingNominationsTable({ data = [], loading }) {
  const { decimals, symbol } = useChainSettings();

  const tableData = data?.map?.((validator, index) => {
    return [
      <Tooltip key={`validator-${index}`} tip={validator.address}>
        <AddressOrIdentity address={validator.address} />
      </Tooltip>,
      <ValueDisplay
        key={`validator-bonded-${index}`}
        value={toPrecision(validator.bonded_owner, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
      <ValueDisplay
        key={`total-bonded-${index}`}
        value={toPrecision(validator.bonded_nominators, decimals)}
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
