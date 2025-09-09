import { stakingRewardsHead } from "../../../utils/constants";
import AddressOrIdentity from "../../address";
import { FlexColumn } from "../../styled/flex";
import Table from "../../table";
import Tooltip from "../../tooltip";
import ValueDisplay from "../../displayValue";
import { toPrecision } from "@osn/common";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import ExtrinsicLink from "../../extrinsic/link";
import { ColoredLink } from "../../styled/link";
import { TextSecondary } from "../../styled/text";

function DestCell({ dest }) {
  if (!dest) {
    return <TextSecondary>-</TextSecondary>;
  }

  if (dest.account) {
    return (
      <FlexColumn style={{ gap: 4 }}>
        <TextSecondary>Account</TextSecondary>
        <AddressOrIdentity address={dest.account} maxWidth={160} />
      </FlexColumn>
    );
  }

  let content = "-";

  if ("staked" in dest || "stash" in dest) {
    content = "Stash"; // todo: Stash account
  }

  if ("controller" in dest) {
    content = "Controller"; // todo: Controller account
  }

  return <TextSecondary>{content}</TextSecondary>;
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
      <DestCell dest={reward.dest} />,
      <Tooltip tip={reward.validator}>
        <AddressOrIdentity address={reward.validator} />
      </Tooltip>,
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
