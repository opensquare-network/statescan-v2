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
import { ReactComponent as CrossIcon } from "../../components/icons/cross.svg";
import { ReactComponent as TimerIcon } from "../../components/icons/timer.svg";
import IpfsItem from "../../components/nft/detail/ipfsItem";
import { bigNumberToLocaleString } from ".";
import { time } from "./time";
import { isCid } from "../cid";
import { getNftInstanceParsedMetadata } from "../nft";
import ExtrinsicAssetsTransferredList from "../../components/extrinsicAssetsTransferredList";
import CircledInfoIcon from "../../components/icons/circledInfoIcon";
import { Flex, FlexCenter, FlexColumn } from "../../components/styled/flex";
import isNil from "lodash.isnil";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import dark from "../../styles/theme/dark";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import QuestionIcon from "../../components/icons/question";

export const TextSecondaryWithCopy = withCopy(TextSecondary);
const ColoredMonoLinkWithCopy = withCopy(ColoredMonoLink);

const CallText = TextSecondary;

function getExtrinsicTime(data) {
  if (!data?.indexer?.blockTime) {
    return null;
  }

  return {
    label: "Extrinsic Time",
    value: <DetailedTime ts={data?.indexer?.blockTime} />,
  };
}

function getNonceItem(data) {
  if (!data?.nonce) {
    return null;
  }

  return {
    label: "Nonce",
    value: <TextSecondary>{data?.nonce}</TextSecondary>,
  };
}

export const toBlockDetailItem = (block) => {
  return {
    "Block Time": <DetailedTime ts={block?.time} />,
    Status: <FinalizedState height={block?.height} />,
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

export const toAccountDetailItem = (id, account, chainSetting) => {
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

  return data;
};

const lookupLock = {
  democrac: "via Democracy/Vote",
  phrelect: "via Council/Vote",
  pyconvot: "via Referenda/Vote",
  "staking ": "via Staking/Bond",
  "vesting ": "via Vesting",
};

const TooltipTextSecondary = styled(TextSecondary)`
  color: ${dark.fontSecondary};
`;

function LockedBreakdown({ lockedBreakdown }) {
  const chainSetting = useSelector(chainSettingSelector);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {lockedBreakdown?.map((item, index) => {
        const { amount, id, reasons } = item;
        return (
          <FlexColumn key={index} style={{ alignItems: "center" }}>
            <ValueDisplay
              value={toPrecision(amount || 0, chainSetting.decimals)}
              symbol={chainSetting.symbol}
              abbreviate={false}
            />
            <TooltipTextSecondary>{lookupLock[id]}</TooltipTextSecondary>
            <TooltipTextSecondary>{reasons}</TooltipTextSecondary>
          </FlexColumn>
        );
      })}
    </div>
  );
}

function ReservedBreakdown({ reservedBreakdown }) {
  const chainSetting = useSelector(chainSettingSelector);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {reservedBreakdown?.map((item, index) => {
        const { amount, id } = item;
        return (
          <FlexColumn key={index} style={{ alignItems: "center" }}>
            <ValueDisplay
              value={toPrecision(amount || 0, chainSetting.decimals)}
              symbol={chainSetting.symbol}
              abbreviate={false}
            />
            <TooltipTextSecondary>{lookupLock[id]}</TooltipTextSecondary>
          </FlexColumn>
        );
      })}
    </div>
  );
}

function ValueDisplayWithTooltip({ value }) {
  const chainSetting = useSelector(chainSettingSelector);
  return (
    <Tooltip
      tip={`${toPrecision(value || 0, chainSetting.decimals)} ${
        chainSetting.symbol
      }`}
    >
      <TextSecondary>
        <ValueDisplay
          value={toPrecision(value || 0, chainSetting.decimals)}
          symbol={chainSetting.symbol}
          abbreviate={false}
        />
      </TextSecondary>
    </Tooltip>
  );
}

export const toOnChainAccountDetailItem = (
  id,
  account,
  multisigAddressData,
) => {
  const lockedBreakdown = account?.data?.lockedBreakdown?.length > 0 && (
    <LockedBreakdown lockedBreakdown={account?.data?.lockedBreakdown} />
  );

  const reservedBreakdown = account?.data?.reservedBreakdown?.length > 0 && (
    <ReservedBreakdown reservedBreakdown={account?.data?.reservedBreakdown} />
  );

  const data = [
    {
      label: "Address",
      value: <AddressAndIdentity address={id} ellipsis={false} checkMultisig />,
    },
    {
      label: "Total Balance",
      value: <ValueDisplayWithTooltip value={account?.data?.total} />,
    },
  ];

  if (!isNil(account?.data?.transferrable)) {
    data.push({
      label: "Transferrable",
      value: <ValueDisplayWithTooltip value={account?.data?.transferrable} />,
    });
  }

  if (!isNil(account?.data?.lockedBalance)) {
    data.push({
      label: "Locked",
      value: (
        <Flex gap={4}>
          <ValueDisplayWithTooltip value={account?.data?.lockedBalance} />
          {lockedBreakdown && (
            <Tooltip tip={lockedBreakdown}>
              <FlexCenter>
                <CircledInfoIcon />
              </FlexCenter>
            </Tooltip>
          )}
        </Flex>
      ),
    });
  }

  data.push({
    label: "Reserved",
    value: (
      <Flex gap={4}>
        <ValueDisplayWithTooltip value={account?.data?.reserved} />
        {reservedBreakdown && (
          <Tooltip tip={reservedBreakdown}>
            <FlexCenter>
              <CircledInfoIcon />
            </FlexCenter>
          </Tooltip>
        )}
      </Flex>
    ),
  });

  if (!isNil(account?.data?.bonded)) {
    data.push({
      label: "Bonded",
      value: <ValueDisplayWithTooltip value={account?.data?.bonded} />,
    });
  }

  data.push({
    label: "Transactions",
    value: <TextSecondary>{account?.detail?.nonce || 0}</TextSecondary>,
  });

  if (multisigAddressData?.multisigAddress) {
    data.push({
      type: "divider",
    });

    data.push({
      label: "Threshold",
      value: (
        <TextSecondary>
          {multisigAddressData?.multisigAddress?.threshold || 0}
        </TextSecondary>
      ),
    });
    data.push({
      label: "Signatories",
      value: (
        <TextSecondary>
          {multisigAddressData?.multisigAddress?.signatories?.length || 0}
        </TextSecondary>
      ),
    });
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
        extrinsicIndex={indexer?.extrinsicIndex}
        id={indexer?.callIndex}
      />
    ),
    "Extrinsics ID": (
      <DetailedExtrinsicId
        blockHeight={indexer?.blockHeight}
        id={indexer?.extrinsicIndex}
      />
    ),
    Block: <DetailedBlock blockHeight={indexer?.blockHeight} copy />,
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
    Block: <DetailedBlock blockHeight={event?.indexer?.blockHeight} copy />,
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

function ExtrinsicErrorResult({ extrinsic }) {
  return (
    <Flex gap={8}>
      <CrossIcon />
      {extrinsic?.error && (
        <FlexCenter gap={4}>
          <TextSecondary>Failed ({extrinsic?.error?.code})</TextSecondary>
          {extrinsic?.error?.message && (
            <Tooltip tip={extrinsic?.error?.message}>
              <FlexCenter>
                <QuestionIcon />
              </FlexCenter>
            </Tooltip>
          )}
        </FlexCenter>
      )}
    </Flex>
  );
}

/**
 * @param {object} opts
 * @param {object} opts.modules chain settings modules
 */
export const toExtrinsicDetailItem = (extrinsic, opts) => {
  const {
    modules = {},
    assetTransferredList = [],
    uniqueTransferredList = [],
  } = opts ?? {};

  const showTransferredList =
    (modules?.assets || modules?.uniques) &&
    (assetTransferredList?.length || uniqueTransferredList?.length);

  const { section, method } = extrinsic?.call || extrinsic || {};

  return [
    getExtrinsicTime(extrinsic),
    {
      label: "Block",
      value: (
        <DetailedBlock blockHeight={extrinsic?.indexer?.blockHeight} copy />
      ),
    },
    extrinsic?.lifetime && {
      label: "Life Time",
      value: (
        <>
          <ColoredInterLink to={`/blocks/${extrinsic?.lifetime?.[0]}`}>
            {extrinsic?.lifetime?.[0].toLocaleString()}
          </ColoredInterLink>
          <TextSecondary>{" ~ "}</TextSecondary>
          <ColoredInterLink to={`/blocks/${extrinsic?.lifetime?.[1]}`}>
            {extrinsic?.lifetime?.[1].toLocaleString()}
          </ColoredInterLink>
        </>
      ),
    },
    {
      label: "Extrinsic Hash",
      value: <TextSecondaryWithCopy>{extrinsic?.hash}</TextSecondaryWithCopy>,
    },
    {
      label: "Module",
      value: <TagHighContrast>{section}</TagHighContrast>,
    },
    {
      label: "Call",
      value: <TagThemed>{method}</TagThemed>,
    },
    extrinsic?.isSigned && {
      label: "Signer",
      value: <AddressOrIdentity address={extrinsic?.signer} ellipsis={false} />,
    },
    showTransferredList && {
      label: "Assets Transferred",
      count: assetTransferredList.length + uniqueTransferredList.length,
      value: (
        <ExtrinsicAssetsTransferredList
          assetTransferredList={assetTransferredList}
          uniqueTransferredList={uniqueTransferredList}
        />
      ),
    },
    getNonceItem(extrinsic),
    extrinsic?.tip > 0 && {
      label: "Tip",
      value: <TextSecondary>{extrinsic?.tip}</TextSecondary>,
    },
    {
      label: "Result",
      value: extrinsic?.isFinalized ? (
        extrinsic?.isSuccess ? (
          <CheckIcon />
        ) : (
          <ExtrinsicErrorResult extrinsic={extrinsic} />
        )
      ) : (
        <TimerIcon />
      ),
    },
  ].filter(Boolean);
};

export const toMultisigDetailItem = (multisig) => {
  if (!multisig) {
    return [];
  }

  return [
    {
      label: "Multisig Address",
      value: (
        <AddressAndIdentity
          address={multisig.address}
          ellipsis={false}
          checkMultisig
        />
      ),
    },
    {
      label: "Call Hash",
      value: (
        <TextSecondaryWithCopy>{multisig?.callHash}</TextSecondaryWithCopy>
      ),
    },
    {
      label: "Extrinsic Time",
      value: <DetailedTime ts={multisig?.indexer?.blockTime} />,
    },
    {
      label: "Block",
      value: (
        <DetailedBlock blockHeight={multisig?.indexer?.blockHeight} copy />
      ),
    },
    multisig?.call?.section && {
      label: "Module",
      value: <TagHighContrast>{multisig?.call?.section}</TagHighContrast>,
    },
    multisig?.call?.method && {
      label: "Call",
      value: <TagThemed>{multisig?.call?.method}</TagThemed>,
    },
  ].filter(Boolean);
};

export function toTxEvmBlockDetailItem(tx) {
  if (!tx) {
    return [];
  }

  const timeItem = getExtrinsicTime(tx);
  timeItem.label = "Time";

  return [
    timeItem,
    {
      label: "Block",
      value: <DetailedBlock blockHeight={tx?.indexer?.blockHeight} copy />,
    },
    {
      label: "Hash",
      value: <TextSecondaryWithCopy>{tx?.hash}</TextSecondaryWithCopy>,
    },
    {
      label: "Finalization",
      value: <FinalizedState height={tx?.indexer?.blockHeight} />,
    },
  ];
}

export function toTxEvmTxDetailItem(tx, chainSetting) {
  if (!tx) {
    return [];
  }

  return [
    {
      label: "From",
      value: <AddressOrIdentity address={tx?.from} ellipsis={false} />,
    },
    {
      label: "To",
      value: <AddressOrIdentity address={tx?.to} ellipsis={false} />,
    },
    {
      label: "Value",
      value: (
        <TextSecondary>
          <ValueDisplay
            value={toPrecision(tx?.value, chainSetting.decimals)}
            symbol={chainSetting?.symbol}
            abbreviate={false}
          />
        </TextSecondary>
      ),
    },
    {
      label: "Fee",
      value: (
        <TextSecondary>
          <ValueDisplay
            value={toPrecision(
              BigNumber(tx?.gasPrice).multipliedBy(tx?.receipt?.gasUsed),
              chainSetting.decimals,
            )}
            symbol={chainSetting?.symbol}
            abbreviate={false}
          />
        </TextSecondary>
      ),
    },
    {
      label: "Gas Used/Limit",
      value: (
        <TextSecondary>
          {tx?.receipt?.gasUsed} / {tx?.gas}
        </TextSecondary>
      ),
    },
    getNonceItem(tx),
    {
      label: "Result",
      value: tx?.receipt?.status === 1 ? <CheckIcon /> : <CrossIcon />,
    },
  ].filter(Boolean);
}
