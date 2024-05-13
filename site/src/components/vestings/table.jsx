import { toPrecision } from "@osn/common";
import { vestingsHead } from "../../utils/constants";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import AddressOrIdentity from "../address";
import ValueDisplay from "../displayValue";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import { useSelector } from "react-redux";
import { overviewSelector } from "../../store/reducers/socketSlice";
import Tooltip from "../tooltip";

function StartingBlockCell({ data }) {
  const overview = useSelector(overviewSelector);
  const startingBlock = data?.startingBlock;

  const content = startingBlock.toLocaleString();

  if (startingBlock > overview?.latestHeight) {
    return <Tooltip tip="Not started">{content}</Tooltip>;
  }

  return (
    <div>
      <ColoredLink to={`/blocks/${startingBlock}`}>{content}</ColoredLink>
    </div>
  );
}

export default function VestingsTable({ data = [], loading }) {
  const { symbol, decimals } = useChainSettings();

  const tableData = data?.map?.((vesting) => {
    return [
      <div style={{ display: "flex" }}>
        <AddressOrIdentity key={vesting.address} address={vesting.address} />
      </div>,
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
    ];
  });

  return <Table heads={vestingsHead} data={tableData} loading={loading} />;
}
