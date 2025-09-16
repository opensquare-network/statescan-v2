import { stakingRewardsHead } from "../../../utils/constants";
import AddressOrIdentity from "../../address";
import Table from "../../table";
import Tooltip from "../../tooltip";
import ValueDisplay from "../../displayValue";
import { toPrecision } from "@osn/common";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import ExtrinsicLink from "../../extrinsic/link";
import { ColoredLink } from "../../styled/link";
import { TextSecondary } from "../../styled/text";
import isNil from "lodash.isnil";

function EmptyCell() {
  return <TextSecondary>-</TextSecondary>;
}

function DestCell({ dest, who }) {
  if (!dest) {
    return <EmptyCell />;
  }

  let account = null;

  if (dest.account) {
    account = dest.account;
  }

  if ("staked" in dest || "stash" in dest || "controller" in dest) {
    account = who;
  }

  if (isNil(account)) {
    return <EmptyCell />;
  }

  return <AddressOrIdentity address={account} maxWidth={160} />;
}

export default function AccountStakingRewardsTable({ data = [], loading }) {
  const { decimals, symbol } = useChainSettings();

  const tableData = data?.map?.((reward) => {
    return [
      <ColoredLink
        key={`${reward}-1`}
        to={`/events/${reward?.indexer?.blockHeight}-${reward?.indexer?.eventIndex}`}
      >
        {reward?.indexer?.blockHeight.toLocaleString()}-
        {reward?.indexer?.eventIndex}
      </ColoredLink>,
      <ExtrinsicLink key={`${reward}-1`} indexer={reward.indexer} />,
      reward?.indexer?.blockTime,
      <DestCell dest={reward?.dest} who={reward?.who} />,
      reward?.validator ? (
        <Tooltip tip={reward.validator}>
          <AddressOrIdentity address={reward.validator} />
        </Tooltip>
      ) : (
        <EmptyCell />
      ),
      <ValueDisplay
        value={toPrecision(reward.amount, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
    ];
  });

  return (
    <Table heads={stakingRewardsHead} data={tableData} loading={loading} />
  );
}
