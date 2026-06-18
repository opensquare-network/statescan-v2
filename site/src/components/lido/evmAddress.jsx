import { useEffect, useState } from "react";
import { toSvg } from "jdenticon";
import styled from "styled-components";
import { withCopy } from "../../HOC/withCopy";
import evmPublicClient from "../../services/evm/client";
import { normalizeEvmAddress } from "../../utils/normalizeAddress";
import { hashEllipsis } from "../../utils/viewFuncs/text";
import ExternalLink from "../externalLink";
import Link from "../styled/link";
import Tooltip from "../tooltip";
import { Inter_14_500, Overpass_Mono_14_500 } from "../../styles/text";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 20px;
  min-width: 0;
  max-width: ${(p) => p.$maxWidth || "100%"};
`;

const AddressTooltip = styled(Tooltip)`
  display: inline-flex;
  align-items: center;
  height: 20px;
  max-width: 100%;
`;

const Avatar = styled.span`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  flex: 0 0 ${(p) => p.size}px;
  border-radius: 50%;
  overflow: hidden;
  background: ${(p) => p.theme.fillSub};
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
`;

const AvatarImage = styled.img`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  flex: 0 0 ${(p) => p.size}px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
`;

const AddressText = styled.span`
  ${Overpass_Mono_14_500};
  transform: translateY(2px);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddressLink = styled(ExternalLink)`
  ${Inter_14_500};
  display: inline-flex;
  max-width: ${(p) => p.$maxWidth || "100%"};
  color: ${(p) => p.theme.theme500};
  text-decoration: none;
  cursor: pointer;
`;

const AddressInternalLink = styled(Link)`
  ${Inter_14_500};
  display: inline-flex;
  max-width: ${(p) => p.$maxWidth || "100%"};
  color: ${(p) => p.theme.theme500};
  text-decoration: none;
  cursor: pointer;
`;

const AddressLinkWithCopy = withCopy(AddressLink);
const AddressInternalLinkWithCopy = withCopy(AddressInternalLink);

function isExternalHref(href) {
  return /^https?:\/\//.test(href);
}

export function useEnsProfile(address) {
  const [profile, setProfile] = useState({ name: null, avatar: null });

  useEffect(() => {
    async function fetchEnsProfile() {
      if (!address || !evmPublicClient) {
        setProfile({ name: null, avatar: null });
        return;
      }

      try {
        const name = await evmPublicClient.getEnsName({ address });
        const avatar = name
          ? await evmPublicClient.getEnsAvatar({ name })
          : null;

        setProfile({ name, avatar });
      } catch (_) {
        setProfile({ name: null, avatar: null });
      }
    }

    fetchEnsProfile();
  }, [address]);

  return profile;
}

function AddressContent({
  address,
  ensName,
  ensAvatar,
  ellipsis,
  avatarSize,
  maxWidth,
}) {
  const displayText =
    ensName || (ellipsis ? hashEllipsis(address, 4, 4) : address);
  const defaultAvatar = toSvg(address, avatarSize);

  return (
    <Wrapper $maxWidth={maxWidth}>
      {ensAvatar ? (
        <AvatarImage src={ensAvatar} alt={displayText} size={avatarSize} />
      ) : (
        <Avatar
          size={avatarSize}
          dangerouslySetInnerHTML={{ __html: defaultAvatar }}
        />
      )}
      <AddressText>{displayText}</AddressText>
    </Wrapper>
  );
}

function AddressWrapper({
  href,
  copy,
  tooltip,
  tooltipContent,
  copyContent,
  maxWidth,
  children,
}) {
  const visibleContent = tooltip ? (
    <AddressTooltip tip={tooltipContent}>{children}</AddressTooltip>
  ) : (
    children
  );

  if (!href) {
    return visibleContent;
  }

  if (isExternalHref(href)) {
    if (copy) {
      return (
        <AddressLinkWithCopy
          href={href}
          copyContent={copyContent}
          $maxWidth={maxWidth}
        >
          {visibleContent}
        </AddressLinkWithCopy>
      );
    }

    return (
      <AddressLink href={href} $maxWidth={maxWidth}>
        {visibleContent}
      </AddressLink>
    );
  }

  if (copy) {
    return (
      <AddressInternalLinkWithCopy
        to={href}
        copyContent={copyContent}
        $maxWidth={maxWidth}
      >
        {visibleContent}
      </AddressInternalLinkWithCopy>
    );
  }

  return (
    <AddressInternalLink to={href} $maxWidth={maxWidth}>
      {visibleContent}
    </AddressInternalLink>
  );
}

export default function EvmAddress({
  address,
  href,
  noLink = false,
  copy = true,
  tooltip = true,
  ellipsis = true,
  avatarSize = 20,
  maxWidth,
}) {
  const normalizedAddress = normalizeEvmAddress(address);
  const { name: ensName, avatar: ensAvatar } = useEnsProfile(normalizedAddress);

  if (!normalizedAddress) {
    return "--";
  }

  const content = (
    <AddressContent
      address={normalizedAddress}
      ensName={ensName}
      ensAvatar={ensAvatar}
      ellipsis={ellipsis}
      avatarSize={avatarSize}
      maxWidth={maxWidth}
    />
  );

  return (
    <AddressWrapper
      href={noLink ? null : href || `/addresses/${normalizedAddress}`}
      copy={copy}
      tooltip={tooltip}
      tooltipContent={ensName || normalizedAddress}
      copyContent={normalizedAddress}
      maxWidth={maxWidth}
    >
      {content}
    </AddressWrapper>
  );
}
