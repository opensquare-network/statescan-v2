import styled from "styled-components";
import BigNumber from "bignumber.js";
import { bigNumberToLocaleString } from "../../../utils/viewFuncs/index";
import AddressOrIdentity from "../../address/index";
import { Inter_14_500 } from "../../../styles/text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  padding-top: 2px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
`;

const Field = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  padding: 8px 0;
  min-width: 176px;
  ${Inter_14_500}
  flex: 0 0 auto;
  color: ${(p) => p.theme.fontPrimary};
`;

const Body = styled.div`
  flex-grow: 1;
  padding: 8px 0 8px 24px;
  font-size: 14px;
  @media screen and (max-width: 900px) {
    padding-left: 0px;
  }
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.fontSecondary};
`;

const BoldText = styled(Text)`
  font-weight: 500;
`;

const BreakText = styled(Text)`
  word-break: break-all;
`;

function fromAssetUnit(value, decimals) {
  return new BigNumber(value).dividedBy(Math.pow(10, decimals)).toString();
}

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
        Creator: <AddressOrIdentity ellipsis={false} address={creator} />,
        Owner: <AddressOrIdentity ellipsis={false} address={owner} />,
      };
    }
    case "ForceCreated": {
      const { owner } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Owner: <AddressOrIdentity ellipsis={false} address={owner} />,
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
        Admin: <AddressOrIdentity ellipsis={false} address={admin} />,
        Owner: <AddressOrIdentity ellipsis={false} address={owner} />,
        Issuer: <AddressOrIdentity ellipsis={false} address={issuer} />,
        Freezer: <AddressOrIdentity ellipsis={false} address={freezer} />,
        "Min Balance": formatBalance(minBalance, asset),
        Sufficient: <BoldText>{isSufficient}</BoldText>,
        Frozen: <BoldText>{isFrozen}</BoldText>,
      };
    }
    case "TeamChanged": {
      const { issuer, admin, freezer } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Admin: <AddressOrIdentity ellipsis={false} address={admin} />,
        Issuer: <AddressOrIdentity ellipsis={false} address={issuer} />,
        Freezer: <AddressOrIdentity ellipsis={false} address={freezer} />,
      };
    }
    case "OwnerChanged": {
      const { owner } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Admin: <AddressOrIdentity ellipsis={false} address={owner} />,
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
          <AddressOrIdentity ellipsis={false} address={beneficiary} />
        ),
        Amount: formatBalance(amount, asset),
      };
    }
    case "Burned": {
      const { owner, balance } = timelineItem.args;
      return {
        "Asset ID": <Text>{`#${asset.assetId}`}</Text>,
        Who: <AddressOrIdentity ellipsis={false} address={owner} />,
        Amount: formatBalance(balance, asset),
      };
    }
    default: {
      return {};
    }
  }
}

export default function TimelineItemFields({ item, asset }) {
  const fields = Object.entries(getFields(item, asset)) || [];

  return (
    <Wrapper>
      {fields.map((field, index) => (
        <Field key={index}>
          <Title>{field[0]}</Title>
          <Body>{field[1]}</Body>
        </Field>
      ))}
    </Wrapper>
  );
}
