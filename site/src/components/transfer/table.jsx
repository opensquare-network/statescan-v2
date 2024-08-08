import { toPrecision } from "@osn/common";
import { transfersHead } from "../../utils/constants";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import AddressOrIdentity from "../address";
import ValueDisplay from "../displayValue";
import ExtrinsicLink from "../extrinsic/link";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import Tooltip from "../tooltip";
import getTransferDecimals from "../../utils/viewFuncs/transferDecimals";
import SymbolLink from "../symbol/symbolLink";
import getTransferSymbol from "../../utils/viewFuncs/transferSymbol";

function ValueCell({ transfer }) {
  const { symbol, decimals } = useChainSettings(transfer.indexer.blockHeight);

  return (
    <ValueDisplay
      value={toPrecision(
        transfer?.balance,
        getTransferDecimals(transfer, decimals),
      )}
      symbol={
        <SymbolLink assetId={transfer.assetId}>
          {getTransferSymbol(transfer, symbol)}
        </SymbolLink>
      }
      showNotEqualTooltip
    />
  );
}

export default function TransfersTable({ data, loading }) {
  const tableData = data?.map?.((transfer, key) => {
    // table cell has padding left(24) and right(24)
    const addressOrIdentityMaxWidth = 200 - 48;

    return [
      <ColoredLink
        key={`${key}-1`}
        to={`/events/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.eventIndex}`}
      >
        {transfer?.indexer?.blockHeight.toLocaleString()}-
        {transfer?.indexer?.eventIndex}
      </ColoredLink>,
      <ExtrinsicLink key={`${key}-1`} indexer={transfer.indexer} />,
      transfer?.indexer?.blockTime,
      <Tooltip tip={transfer?.from}>
        <AddressOrIdentity
          key={transfer?.from}
          address={transfer?.from}
          maxWidth={addressOrIdentityMaxWidth}
        />
      </Tooltip>,
      <Tooltip tip={transfer?.to}>
        <AddressOrIdentity
          key={transfer?.to}
          address={transfer?.to}
          maxWidth={addressOrIdentityMaxWidth}
        />
      </Tooltip>,
      <ValueCell transfer={transfer} />,
    ];
  });

  return <Table heads={transfersHead} data={tableData} loading={loading} />;
}
