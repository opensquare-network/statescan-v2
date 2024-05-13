import { toPrecision } from "@osn/common";
import { vestingsHead } from "../../utils/constants";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import AddressOrIdentity from "../address";
import ValueDisplay from "../displayValue";
import { ColoredLink } from "../styled/link";
import Table from "../table";

export default function VestingsTable({ data = [], loading }) {
  const { symbol, decimals } = useChainSettings();

  const tableData = data?.map?.((vesting) => {
    return [
      <div key={vesting.address} style={{ display: "flex" }}>
        <AddressOrIdentity key={vesting.address} address={vesting.address} />
      </div>,
      <ColoredLink to={`/blocks/${vesting.startingBlock}`}>
        {vesting.startingBlock.toLocaleString()}
      </ColoredLink>,
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
