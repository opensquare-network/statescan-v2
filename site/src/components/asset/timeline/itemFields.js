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
      {bigNumberToLocaleString(balanceStr)}
      {Number.isInteger(asset.decimals) && asset.symbol ? (
        <span style={{ marginLeft: 8 }}>
          ({bigNumberToLocaleString(fromAssetUnit(balance, asset.decimals))}{" "}
          {asset.symbol})
        </span>
      ) : (
        <></>
      )}
    </BreakText>
  );
}

function getFields(timelineItem, asset) {
  switch (timelineItem.name) {
    case "Created": {
      const { creator, owner } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
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
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Owner: (
          <AddressOrIdentity key={owner} ellipsis={false} address={owner} />
        ),
      };
    }
    case "MetadataSet": {
      const { decimals, name, symbol } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Symbol: <Text>{symbol}</Text>,
        Name: <Text>{name}</Text>,
        Decimals: <Text>{decimals}</Text>,
      };
    }
    case "MetadataCleared": {
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
      };
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
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
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
        "Min Balance": formatBalance(minBalance, asset),
        Sufficient: <BoldText>{isSufficient}</BoldText>,
        Frozen: <BoldText>{isFrozen}</BoldText>,
      };
    }
    case "TeamChanged": {
      const { issuer, admin, freezer } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
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
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Admin: (
          <AddressOrIdentity key={owner} ellipsis={false} address={owner} />
        ),
      };
    }
    case "AssetFrozen": {
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
      };
    }
    case "AssetThawed": {
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
      };
    }
    case "Destroyed": {
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
      };
    }
    case "Issued": {
      const { beneficiary, amount } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Beneficiary: (
          <AddressOrIdentity
            key={beneficiary}
            ellipsis={false}
            address={beneficiary}
          />
        ),
        Amount: formatBalance(amount, asset),
      };
    }
    case "Burned": {
      const { owner, balance } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Who: <AddressOrIdentity key={owner} ellipsis={false} address={owner} />,
        Amount: formatBalance(balance, asset),
      };
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
