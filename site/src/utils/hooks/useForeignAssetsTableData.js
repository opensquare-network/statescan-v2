import { ColoredMonoLink } from "../../components/styled/link";
import { toPrecision } from "@osn/common";
import ValueDisplay from "../../components/displayValue";
import AddressOrIdentity from "../../components/address";
import Tooltip from "../../components/tooltip";
import { bigNumberToLocaleString } from "../viewFuncs";
import AssetSymbolAndName from "../../components/asset/assetSymbolAndName";
import { addressEllipsis } from "@osn/common";
import ForeignAssetsLocation from "../../components/foreignAssetsLocation";
import { currencify } from "../../utils";

export default function useForeignAssetsTableData(assets = []) {
  return assets?.map?.((asset) => {
    const { assetId, metadata, detail, location } = asset;
    const link = `/foreign-assets/${assetId}`;
    const supply = toPrecision(detail?.supply, metadata?.decimals || 0);

    return [
      <Tooltip tip={assetId}>
        <ColoredMonoLink to={link}>{addressEllipsis(assetId)}</ColoredMonoLink>
      </Tooltip>,
      <AssetSymbolAndName asset={asset} foreignAsset={true} />,
      <ForeignAssetsLocation location={location} />,
      <Tooltip tip={detail?.owner}>
        <AddressOrIdentity key={detail?.owner} address={detail?.owner} />
      </Tooltip>,
      <Tooltip tip={detail?.issuer}>
        <AddressOrIdentity key={detail?.issuer} address={detail?.issuer} />
      </Tooltip>,
      <span>{currencify(detail?.accounts)}</span>,
      <Tooltip pullRight={true} tip={bigNumberToLocaleString(supply)}>
        <ValueDisplay value={supply} />
      </Tooltip>,
    ];
  });
}
