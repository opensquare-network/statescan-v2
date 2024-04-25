import capitalize from "lodash.capitalize";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { closeMobileMenu } from "../../../store/reducers/mobileMenuSlice";
import { Inter_12_500, Inter_14_500, Inter_14_600 } from "../../../styles/text";
import { mobilecss } from "../../../styles/responsive";
import { isHash, lowerCase } from "../../../utils/viewFuncs/text";
import AccountIcon from "../../icons/accountIcon";
import BlockIcon from "../../icons/blockIcon";
import TransfersIcon from "../../icons/transfersIcon";
import { Flex, FlexColumn } from "../../styled/flex";
import { makeExploreDropdownItemRouteLink } from "./utils";
import AssetLogo from "../../assetLogo";
import NftThumbnail from "../../nft/thumbnail";
import noop from "lodash.noop";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { castArray } from "lodash";
import { flex_1, p_x, p_y, truncate } from "../../../styles/tailwindcss";
import AddressOrIdentity from "../../address";

const padding = 16;

const DropdownFlexColumn = styled(FlexColumn)`
  background: ${({ theme }) => theme.fillPopup};
  position: absolute;
  border: 1px solid ${({ theme }) => theme.strokeBase};
  box-shadow: ${({ theme }) => theme.shadowPanel};
  border-radius: 8px;
  width: 545px;
  ${p_y(padding)};
  top: 55px;
  z-index: 9999;

  ${mobilecss(css`
    width: inherit;
    left: 0;
    right: 0;
  `)}
`;
const DropdownGroup = styled.div``;
const DropdownGroupTitle = styled.h5`
  margin: 0;
  margin-bottom: 8px;
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;
  ${p_x(padding)};
  ${Inter_12_500};
`;

const DropdownLinkItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 44px;
  ${p_x(padding)};

  ${(p) =>
    p.selected &&
    css`
      background-color: ${(p) => p.theme.fillPopupHover};
    `}
`;
const DropdownItemContent = styled(Flex)`
  ${truncate};
`;
const DropdownItemContentIconWrapper = styled.div`
  display: inline-flex;
  margin-right: 8px;
`;
const DropdownItemContentLabel = styled.span`
  margin-right: 8px;
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
  ${truncate};
`;
const DropdownItemContentValue = styled.div`
  color: ${(p) => p.theme.fontTertiary};
  ${Inter_14_500};
  ${truncate};
  ${flex_1};
`;

function renderItem(type, value) {
  const typeMap = {
    // value: number | string
    block: {
      icon: <BlockIcon />,
      label: capitalize(type),
      contentValue: (
        <DropdownItemContentValue>
          {!isHash(value) ? "#" : ""}
          {value}
        </DropdownItemContentValue>
      ),
    },
    extrinsic: {
      icon: <TransfersIcon />,
      label: capitalize(type),
      contentValue: (
        <DropdownItemContentValue>{value}</DropdownItemContentValue>
      ),
    },
    account: {
      icon: <AccountIcon />,
      label: capitalize(type),
      contentValue: (
        <DropdownItemContentValue>{value}</DropdownItemContentValue>
      ),
    },

    // value: object
    assets: {
      icon: (
        <AssetLogo assetId={value.assetId} assetHeight={value?.assetHeight} />
      ),
      label: value?.metadata?.symbol,
      contentValue: (
        <DropdownItemContentValue>
          {value?.metadata?.name}
        </DropdownItemContentValue>
      ),
    },

    // value: object
    nftClasses: {
      icon: (
        <NftThumbnail
          size={24}
          image={value?.parsedMetadata?.resource?.thumbnail}
          background={value?.parsedMetadata?.resource?.metadata?.background}
        />
      ),
      label: value?.parsedMetadata?.name,
      contentValue: (
        <DropdownItemContentValue>#{value?.classId}</DropdownItemContentValue>
      ),
    },

    // value: object
    nftInstances: {
      icon: (
        <NftThumbnail
          size={24}
          image={value?.parsedMetadata?.resource?.thumbnail}
          background={value?.parsedMetadata?.resource?.metadata?.background}
        />
      ),
      label: value?.parsedMetadata?.name,
      contentValue: (
        <DropdownItemContentValue>
          #{value?.instanceId}
        </DropdownItemContentValue>
      ),
    },

    // value: identities
    identities: {
      icon: <AccountIcon />,
      contentValue: (
        <DropdownItemContentValue key={value.account}>
          <AddressOrIdentity noLink address={value?.account} />
        </DropdownItemContentValue>
      ),
    },
  };

  return typeMap[type] ?? {};
}

function ExploreDropdownGroup({
  hint = {},
  selectedHintKey,
  setSelectedHintKey = noop,
  setSelectedHintItem = noop,
}) {
  const items = castArray(hint.value);

  if (!items.length) {
    return null;
  }

  return (
    <DropdownGroup key={hint.type}>
      <DropdownGroupTitle>{lowerCase(hint.type)}</DropdownGroupTitle>
      {items.map((item, idx) => (
        <ExploreDropdownItem
          type={hint.type}
          item={item}
          idx={idx}
          selectedHintKey={selectedHintKey}
          setSelectedHintKey={setSelectedHintKey}
          setSelectedHintItem={setSelectedHintItem}
        />
      ))}
    </DropdownGroup>
  );
}

function ExploreDropdownItem({
  type,
  idx,
  item,
  selectedHintKey,
  setSelectedHintKey = noop,
  setSelectedHintItem = noop,
}) {
  const dispatch = useDispatch();

  const itemKey = `${type}-${idx}`;
  const { icon, label, contentValue } = renderItem(type, item);

  const selected = itemKey === selectedHintKey;
  useEffect(() => {
    if (selected) {
      setSelectedHintItem({
        type,
        value: item,
      });
    }
  }, [selected, item, setSelectedHintItem, type]);

  return (
    <DropdownLinkItem
      key={itemKey}
      to={makeExploreDropdownItemRouteLink(type, item)}
      selected={selected}
      onClick={() => {
        dispatch(closeMobileMenu());
      }}
      onMouseEnter={() => {
        setSelectedHintKey(itemKey);
      }}
      onMouseOver={() => {
        setSelectedHintKey(itemKey);
      }}
    >
      <DropdownItemContent>
        {icon && (
          <DropdownItemContentIconWrapper>
            {icon}
          </DropdownItemContentIconWrapper>
        )}
        {label && <DropdownItemContentLabel>{label}</DropdownItemContentLabel>}
      </DropdownItemContent>
      {contentValue}
    </DropdownLinkItem>
  );
}

function ExploreDropdown(
  {
    hints,
    hintsKeys = [],
    visible,
    setSelectedHintItem = noop,
    selectedHintKey,
    setSelectedHintKey = noop,
  },
  ref,
) {
  useImperativeHandle(ref, () => ({ handleArrowNavigate }));

  const selectedIndex = useMemo(
    () => hintsKeys.findIndex((k) => k === selectedHintKey),
    [hintsKeys, selectedHintKey],
  );

  function handleArrowNavigate(code = "") {
    if (code === "ArrowUp") {
      if (selectedIndex > 0) {
        setSelectedHintKey(hintsKeys[selectedIndex - 1]);
      }
    } else if (code === "ArrowDown") {
      if (selectedIndex < hintsKeys.length - 1) {
        setSelectedHintKey(hintsKeys[selectedIndex + 1]);
      }
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <DropdownFlexColumn gap={8} className="explore-dropdown">
      {hints.map((hint, idx) => (
        <ExploreDropdownGroup
          key={`${hint.type}-${idx}`}
          hint={hint}
          selectedHintKey={selectedHintKey}
          setSelectedHintKey={setSelectedHintKey}
          setSelectedHintItem={setSelectedHintItem}
        />
      ))}
    </DropdownFlexColumn>
  );
}

export default forwardRef(ExploreDropdown);
