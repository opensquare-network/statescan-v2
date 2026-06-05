import BigNumber from "bignumber.js";
import { bigNumberToLocaleString } from "../../../utils/viewFuncs";
import AddressOrIdentity from "../../address";
import { fromAssetUnit } from "../../../utils";
import TimelineItemFields from "../../timeline/itemFields";
import { Text, BoldText, BreakText } from "../../timeline/styled";

function formatBalance(balance, asset) {
  const balanceStr = new BigNumber(balance).toString();
  return (
    <BreakText>
      {Number.isInteger(asset.decimals) && asset.symbol ? (
        <span style={{ marginLeft: 8 }}>
          {bigNumberToLocaleString(fromAssetUnit(balance, asset.decimals))}{" "}
          {asset.symbol}
        </span>
      ) : (
        bigNumberToLocaleString(balanceStr)
      )}
    </BreakText>
  );
}

function getFields(timelineItem, asset) {
  switch (timelineItem.name) {
    case "Created": {
      const { creator, owner } = timelineItem.args;
      return {
        Creator: (
          <AddressOrIdentity key={creator} ellipsis={false} address={creator} />
        ),
        Owner: (
          <AddressOrIdentity key={owner} ellipsis={false} address={owner} />
        ),
      };
    }
    case "ForceCreated": {
      const { owner } = timelineItem.args;
      return {
        Owner: (
          <AddressOrIdentity key={owner} ellipsis={false} address={owner} />
        ),
      };
    }
    case "MetadataSet": {
      const { decimals, name, symbol } = timelineItem.args;
      return {
        Symbol: <Text>{symbol}</Text>,
        Name: <Text>{name}</Text>,
        Decimals: <Text>{decimals}</Text>,
      };
    }
    case "MetadataCleared": {
      return {};
    }
    case "AssetStatusChanged": {
      const {
        owner,
        issuer,
        admin,
        freezer,
        minBalance,
        isSufficient,
        isFrozen,
      } = timelineItem.args;
      return {
        Admin: (
          <AddressOrIdentity key={admin} ellipsis={false} address={admin} />
        ),
        Owner: (
          <AddressOrIdentity key={owner} ellipsis={false} address={owner} />
        ),
        Issuer: (
          <AddressOrIdentity key={issuer} ellipsis={false} address={issuer} />
        ),
        Freezer: (
          <AddressOrIdentity key={freezer} ellipsis={false} address={freezer} />
        ),
        "Min Balance": formatBalance(minBalance, asset?.metadata ?? asset),
        Sufficient: <BoldText>{isSufficient}</BoldText>,
        Frozen: <BoldText>{isFrozen}</BoldText>,
      };
    }
    case "TeamChanged": {
      const { issuer, admin, freezer } = timelineItem.args;
      return {
        Admin: (
          <AddressOrIdentity key={admin} ellipsis={false} address={admin} />
        ),
        Issuer: (
          <AddressOrIdentity key={issuer} ellipsis={false} address={issuer} />
        ),
        Freezer: (
          <AddressOrIdentity key={freezer} ellipsis={false} address={freezer} />
        ),
      };
    }
    case "OwnerChanged": {
      const { owner } = timelineItem.args;
      return {
        Admin: (
          <AddressOrIdentity key={owner} ellipsis={false} address={owner} />
        ),
      };
    }
    case "AssetFrozen": {
      return {};
    }
    case "AssetThawed": {
      return {};
    }
    case "Destroyed": {
      return {};
    }
    default: {
      return {};
    }
  }
}

export default function AssetTimelineItemFields({ item, data: asset }) {
  const fields = Object.entries(getFields(item, asset));
  return <TimelineItemFields fields={fields} />;
}
