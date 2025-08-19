import { toPrecision } from "@osn/common";
import { vestingsHead } from "../../utils/constants";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import AddressOrIdentity from "../address";
import ValueDisplay from "../displayValue";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import Tooltip from "../tooltip";
import isNil from "lodash.isnil";
import { Flex, FlexEnd } from "../styled/flex";
import useOverview from "../../hooks/overview/useOverview";
import getUnlockableData from "./getUnlockableData";
import styled from "styled-components";

const UnlockableCellWrapper = styled(FlexEnd)`
  display: grid;
`;

function StartingBlockCell({ data }) {
  const { overview } = useOverview();
  const startingBlock = data?.startingBlock;
  const latestHeight = overview?.latestHeight;

  const content = startingBlock.toLocaleString();

  const notStarted = isNil(latestHeight) || startingBlock > latestHeight;

  if (notStarted) {
    return <Tooltip tip="Not started">{content}</Tooltip>;
  }

  return (
    <div>
      <ColoredLink to={`/blocks/${startingBlock}`}>{content}</ColoredLink>
    </div>
  );
}

function UnlockableCell({ data }) {
  const { overview } = useOverview();
  const { symbol, decimals } = useChainSettings();
  const latestHeight = overview?.latestHeight;

  const { unlockableBalance, unlockablePercentage } = getUnlockableData(
    latestHeight,
    data,
  );

  return (
    <UnlockableCellWrapper>
      <Tooltip
        tip={
          <ValueDisplay
            value={toPrecision(unlockableBalance, decimals)}
            symbol={symbol}
          />
        }
      >
        {unlockablePercentage}%
      </Tooltip>
    </UnlockableCellWrapper>
  );
}

export default function VestingsTable({ data = [], loading }) {
  const { symbol, decimals } = useChainSettings();

  const tableData = data?.map?.((vesting) => {
    return [
      <Flex>
        <AddressOrIdentity key={vesting.address} address={vesting.address} />
      </Flex>,
      <StartingBlockCell data={vesting} />,
      <ValueDisplay
        value={toPrecision(vesting.perBlock, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
      <ValueDisplay
        value={toPrecision(vesting.locked, decimals)}
        symbol={symbol}
        showNotEqualTooltip
      />,
      <UnlockableCell data={vesting} />,
    ];
  });

  return <Table heads={vestingsHead} data={tableData} loading={loading} />;
}
