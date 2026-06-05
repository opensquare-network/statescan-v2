import BigNumber from "bignumber.js";
import { bigNumberToLocaleString } from "../../../utils/viewFuncs";
import AddressOrIdentity from "../../address";
import { fromAssetUnit } from "../../../utils";
import TimelineItemFields from "../../timeline/itemFields";
import { BreakText } from "../../timeline/styled";

function formatBalance(balance, asset) {
  const balanceStr = new BigNumber(balance).toString();
  return (
    <BreakText>
      {Number.isInteger(asset?.decimals) && asset?.symbol ? (
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

function getFields(activityItem, asset) {
  switch (activityItem.name) {
    case "Issued": {
      const { beneficiary, amount } = activityItem.args;
      return {
        Beneficiary: (
          <AddressOrIdentity
            key={beneficiary}
            ellipsis={false}
            address={beneficiary}
          />
        ),
        Amount: formatBalance(amount, asset?.metadata ?? asset),
      };
    }
    case "Burned": {
      const { owner, balance } = activityItem.args;
      return {
        Who: <AddressOrIdentity key={owner} ellipsis={false} address={owner} />,
        Amount: formatBalance(balance, asset?.metadata ?? asset),
      };
    }
    case "IssuedCredit":
    case "BurnedCredit":
    case "IssuedDebt":
    case "BurnedDebt": {
      const { amount } = activityItem.args;
      return {
        Amount: formatBalance(amount, asset?.metadata ?? asset),
      };
    }
    default: {
      return {};
    }
  }
}

export default function AssetActivityItemFields({ item, data: asset }) {
  const fields = Object.entries(getFields(item, asset));
  return <TimelineItemFields fields={fields} />;
}
