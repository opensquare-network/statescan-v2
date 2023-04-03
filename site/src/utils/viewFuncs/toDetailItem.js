import { DetailedTime } from "../../components/styled/time";
import FinalizedState from "../../components/states/finalizedState";
import AddressOrIdentity, {
  AddressAndIdentity,
} from "../../components/address";
import React from "react";
import { withCopy } from "../../HOC/withCopy";
import { TextSecondary } from "../../components/styled/text";
import {
  ColoredInterLink,
  ColoredMonoLink,
} from "../../components/styled/link";
import Tooltip from "../../components/tooltip";
import { toPrecision } from "@osn/common";
import ValueDisplay from "../../components/displayValue";
import DetailedCallId from "../../components/detail/callId";
import DetailedExtrinsicId from "../../components/detail/extrinsicId";
import DetailedBlock from "../../components/detail/block";
import {
  StatusNegativeTag,
  Tag,
  TagHighContrast,
  TagThemed,
} from "../../components/tag";
import { ReactComponent as CheckIcon } from "../../components/icons/check.svg";
import { ReactComponent as TimerIcon } from "../../components/icons/timer.svg";
import IpfsItem from "../../components/nft/detail/ipfsItem";
import { bigNumberToLocaleString } from ".";
import { time } from "./time";
import { isCid } from "../cid";
import { getNftInstanceParsedMetadata } from "../nft";
import AchainableLabels from "../../components/achainableLabels/index";
import ExtrinsicAssetsTransferredList from "../../components/extrinsicAssetsTransferredList";
import styled from "styled-components";
import { inline_block, w } from "../../styles/tailwindcss";

const TextSecondaryWithCopy = withCopy(TextSecondary);
const ColoredMonoLinkWithCopy = withCopy(ColoredMonoLink);

const CallText = TextSecondary;

export const toBlockDetailItem = (block) => {
  return {
    "Block Time": <DetailedTime ts={block?.time} />,
    Status: <FinalizedState finalized={block?.isFinalized} />,
    Hash: <TextSecondaryWithCopy>{block?.hash}</TextSecondaryWithCopy>,
    "Parent Hash": (
      <ColoredMonoLinkWithCopy
        to={`/blocks/${(Number.parseInt(block?.height) - 1).toString()}`}
      >
        {block?.parentHash}
      </ColoredMonoLinkWithCopy>
    ),
    "State Root": (
      <TextSecondaryWithCopy>{block?.stateRoot}</TextSecondaryWithCopy>
    ),
    "Extrinsics Root": (
      <TextSecondaryWithCopy>{block?.extrinsicsRoot}</TextSecondaryWithCopy>
    ),
    Validator: (
      <AddressOrIdentity address={block?.validator} ellipsis={false} />
    ),
  };
};

export const toAccountDetailItem = (
  id,
  account,
  chainSetting,
  achainableProfile,
) => {
  const data = {
    Address: <AddressAndIdentity address={id} ellipsis={false} />,
    "Total Balance": (
      <Tooltip
        tip={`${toPrecision(
          account?.data?.total || 0,
          chainSetting.decimals,
        )} ${chainSetting.symbol}`}
      >
        <TextSecondary>
          <ValueDisplay
            value={toPrecision(
              account?.data?.total || 0,
              chainSetting.decimals,
            )}
            symbol={chainSetting.symbol}
            abbreviate={false}
          />
        </TextSecondary>
      </Tooltip>
    ),
    Free: (
      <Tooltip
        tip={`${toPrecision(account?.data?.free || 0, chainSetting.decimals)} ${
          chainSetting.symbol
        }`}
      >
        <TextSecondary>
          <ValueDisplay
            value={toPrecision(account?.data?.free || 0, chainSetting.decimals)}
            symbol={chainSetting.symbol}
            abbreviate={false}
          />
        </TextSecondary>
      </Tooltip>
    ),
    Reserved: (
      <Tooltip
        tip={`${toPrecision(
          account?.data?.reserved || 0,
          chainSetting.decimals,
        )} ${chainSetting.symbol}`}
      >
        <TextSecondary>
          <ValueDisplay
            value={toPrecision(
              account?.data?.reserved || 0,
              chainSetting.decimals,
            )}
            symbol={chainSetting.symbol}
            abbreviate={false}
          />
        </TextSecondary>
      </Tooltip>
    ),
    Nonce: <TextSecondary>{account?.detail?.nonce || 0}</TextSecondary>,
  };

  if (achainableProfile) {
    data["Labels"] = <AchainableLabels achainableProfile={achainableProfile} />;
  }

  return data;
};

export const toNftClassDetailItem = (nftClass) => {
  const detailInfo = {
    "Class ID": <TextSecondary>{nftClass?.classId}</TextSecondary>,
    "Created Time": (
      <TextSecondary>{time(nftClass?.indexer?.blockTime)}</TextSecondary>
    ),
    Instance: (
      <TextSecondary>
        {nftClass?.details?.items ?? nftClass?.details?.instances}
      </TextSecondary>
    ),
    Owner: (
      <AddressOrIdentity address={nftClass?.details?.owner} ellipsis={false} />
    ),
    Issuer: (
      <AddressOrIdentity address={nftClass?.details?.issuer} ellipsis={false} />
    ),
    Admin: (
      <AddressOrIdentity address={nftClass?.details?.admin} ellipsis={false} />
    ),
    Freezer: (
      <AddressOrIdentity
        address={nftClass?.details?.freezer}
        ellipsis={false}
      />
    ),
  };

  const isIpfsCid = isCid(nftClass?.parsedMetadata?.image);
  if (isIpfsCid) {
    detailInfo["Link"] = <IpfsItem cid={nftClass?.parsedMetadata?.image} />;
  }

  return detailInfo;
};

export const toNftInstanceDetailItem = (nftClass, nftInstance) => {
  const detailInfo = {
    "Class ID": <TextSecondary>{nftClass?.classId}</TextSecondary>,
    "Instance ID": <TextSecondary>{nftInstance?.instanceId}</TextSecondary>,
    "Created Time": (
      <TextSecondary>{time(nftInstance?.indexer?.blockTime)}</TextSecondary>
    ),
    Owner: (
      <AddressOrIdentity
        address={nftInstance?.details?.owner}
        ellipsis={false}
      />
    ),
  };

  const parsedMetadata = getNftInstanceParsedMetadata(nftClass, nftInstance);
  const isIpfsCid = isCid(parsedMetadata?.image);
  if (isIpfsCid) {
    detailInfo["Link"] = <IpfsItem cid={parsedMetadata?.image} />;
  }

  return detailInfo;
};

export const toAssetDetailItem = (id, asset) => {
  return {
    Symbol: <TextSecondary>{asset?.metadata?.symbol}</TextSecondary>,
    Name: <TextSecondary>{asset?.metadata?.name}</TextSecondary>,
    "Asset ID": <TextSecondary>#{asset.assetId}</TextSecondary>,
    Owner: (
      <AddressOrIdentity address={asset?.detail?.owner} ellipsis={false} />
    ),
    Issue: (
      <AddressOrIdentity address={asset?.detail?.issuer} ellipsis={false} />
    ),
    Admin: (
      <AddressOrIdentity address={asset?.detail?.admin} ellipsis={false} />
    ),
    Freezer: (
      <AddressOrIdentity address={asset?.detail?.freezer} ellipsis={false} />
    ),
    Supply: (
      <TextSecondary>
        {`${bigNumberToLocaleString(
          toPrecision(asset?.detail?.supply, asset?.metadata?.decimals || 0),
        )} ${asset?.metadata?.symbol || ""}`}
      </TextSecondary>
    ),
    Decimals: <TextSecondary>{asset?.metadata?.decimals}</TextSecondary>,
    ...(asset?.destroyed
      ? { Status: <StatusNegativeTag>Destroyed</StatusNegativeTag> }
      : {}),
    Holders: <TextSecondary>{asset?.detail?.accounts}</TextSecondary>,
    //TODO: TransfersCount
  };
};

export const toCallDetailItem = (indexer, section, method) => {
  return {
    "Call ID": (
      <DetailedCallId
        blockHeight={indexer?.blockHeight}
        id={indexer?.callIndex}
      />
    ),
    "Extrinsics ID": (
      <DetailedExtrinsicId
        blockHeight={indexer?.blockHeight}
        id={indexer?.extrinsicIndex}
      />
    ),
    Block: <DetailedBlock blockHeight={indexer?.blockHeight} />,
    Timestamp: <DetailedTime ts={indexer?.blockTime} />,
    Method: <Tag>{method}</Tag>,
    Call: (
      <CallText>
        {section}({method})
      </CallText>
    ),
  };
};

export const toEventDetailItem = (event) => {
  return {
    "Event Time": <DetailedTime ts={event?.indexer?.blockTime} />,
    Block: <DetailedBlock blockHeight={event?.indexer?.blockHeight} />,
    "Extrinsic ID": (
      <DetailedExtrinsicId
        id={event?.indexer?.extrinsicIndex}
        blockHeight={event?.indexer?.blockHeight}
      />
    ),
    "Event Index": <TextSecondary>{event?.indexer?.eventIndex}</TextSecondary>,
    Module: <TagHighContrast>{event?.section}</TagHighContrast>,
    "Event Name": <Tag>{event?.method}</Tag>,
    // Description: (
    //   <TextSecondaryWithCopy>
    //     {event?.args?.[0].docs?.join("") || ""}
    //   </TextSecondaryWithCopy>
    // ),
    // TODO: Value field for transfer event
  };
};

const ExtrinsicAssetsTransferredLabel = styled.span`
  ${inline_block};
  ${w(240)};
`;
export const toExtrinsicDetailItem = (extrinsic) => {
  return [
    {
      label: "Extrinsic Time",
      content: <DetailedTime ts={extrinsic?.indexer?.blockTime} />,
    },
    {
      label: "Block",
      content: <DetailedBlock blockHeight={extrinsic?.indexer?.blockHeight} />,
    },
    extrinsic?.lifetime && {
      label: "Life Time",
      content: (
        <>
          <ColoredInterLink to={` / block /${extrinsic?.lifetime?.[0]}`}>
            {extrinsic?.lifetime?.[0].toLocaleString()}
          </ColoredInterLink>
          <TextSecondary>{" ~ "}</TextSecondary>
          <ColoredInterLink to={` / block /${extrinsic?.lifetime?.[1]}`}>
            {extrinsic?.lifetime?.[1].toLocaleString()}
          </ColoredInterLink>
        </>
      ),
    },
    {
      label: "Extrinsic Hash",
      content: <TextSecondaryWithCopy>{extrinsic?.hash}</TextSecondaryWithCopy>,
    },
    {
      label: "Module",
      content: <TagHighContrast>{extrinsic?.call?.section}</TagHighContrast>,
    },
    {
      label: "Call",
      content: <TagThemed>{extrinsic?.call?.method}</TagThemed>,
    },
    extrinsic?.isSigned && {
      label: "Signer",
      content: (
        <AddressOrIdentity address={extrinsic?.signer} ellipsis={false} />
      ),
    },
    {
      label: (
        <ExtrinsicAssetsTransferredLabel>
          Assets Transferred
        </ExtrinsicAssetsTransferredLabel>
      ),
      content: <ExtrinsicAssetsTransferredList />,
    },
    extrinsic?.nonce && {
      label: "Nonce",
      content: <TextSecondary>{extrinsic?.nonce}</TextSecondary>,
    },
    extrinsic?.tip > 0 && {
      label: "Tip",
      content: extrinsic?.tip,
    },
    {
      label: "Result",
      content: extrinsic?.isFinalized ? <CheckIcon /> : <TimerIcon />,
    },
  ].filter(Boolean);
};
