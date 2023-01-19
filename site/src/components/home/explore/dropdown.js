import capitalize from "lodash.capitalize";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { closeMobileMenu } from "../../../store/reducers/mobileMenuSlice";
import { Inter_12_500, Inter_14_500, Inter_14_600 } from "../../../styles/text";
import { mobilecss } from "../../../styles/responsive";
import { isHash } from "../../../utils/viewFuncs/text";
import AccountIcon from "../../icons/accountIcon";
import BlockIcon from "../../icons/blockIcon";
import TransfersIcon from "../../icons/transfersIcon";
import { Flex, FlexColumn } from "../../styled/flex";
import { makeExploreDropdownItemRouteLink } from "./utils";
import AssetLogo from "../../assetLogo";
import NftThumbnail from "../../nft/thumbnail";

const padding = 16;

const DropdownFlexColumn = styled(FlexColumn)`
  background: ${({ theme }) => theme.fillPopup};
  position: absolute;
  border: 1px solid ${({ theme }) => theme.strokeBase};
  box-shadow: ${({ theme }) => theme.shadowPanel};
  border-radius: 8px;
  width: 545px;
  padding: ${padding}px;
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
  margin-bottom: 4px;
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;
  ${Inter_12_500};
`;

const DropdownLinkItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 44px;
  margin: 0 -${padding}px;
  padding: 0 ${padding}px;

  &:hover {
    background-color: ${(p) => p.theme.fillPopupHover};
  }

  ${(p) =>
    p.selected &&
    css`
      background-color: ${(p) => p.theme.fillPopupHover};
    `}
`;
const DropdownItemContent = styled(Flex)``;
const DropdownItemContentIconWrapper = styled.div`
  display: inline-flex;
  margin-right: 8px;
`;
const DropdownItemContentLabel = styled.span`
  margin-right: 8px;
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
`;
const DropdownItemContentValue = styled.div`
  word-break: break-all;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${(p) => p.theme.fontTertiary};
  ${Inter_14_500};
`;

// FIXME: should support more type in future
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
      icon: <AssetLogo assetId={value.assetId} />,
      label: value?.metadata?.symbol,
      contentValue: (
        <DropdownItemContentValue>
          {value?.metadata?.name}
        </DropdownItemContentValue>
      ),
    },

    // value: object
    nftClasses: {
      icon: <NftThumbnail image={value?.parsedMetadata?.resource?.thumbnail} />,
      label: value?.parsedMetadata?.name,
      contentValue: (
        <DropdownItemContentValue>#{value?.classId}</DropdownItemContentValue>
      ),
    },

    // value: object
    nftInstances: {
      icon: <NftThumbnail image={value?.parsedMetadata?.resource?.thumbnail} />,
      label: value?.parsedMetadata?.name,
      contentValue: (
        <DropdownItemContentValue>
          #{value?.instanceId}
        </DropdownItemContentValue>
      ),
    },
  };

  return typeMap[type] ?? {};
}

function ExploreDropdownItem({ value, type, selected }) {
  const dispatch = useDispatch();

  const options = Array.isArray(value) ? value : [value];

  return options.map((value, index) => {
    const { icon, label, contentValue } = renderItem(type, value);

    return (
      <DropdownLinkItem
        key={index}
        to={makeExploreDropdownItemRouteLink(type, value)}
        selected={selected}
        onClick={() => {
          dispatch(closeMobileMenu());
        }}
      >
        <DropdownItemContent>
          {icon && (
            <DropdownItemContentIconWrapper>
              {icon}
            </DropdownItemContentIconWrapper>
          )}
          {label && (
            <DropdownItemContentLabel>{label}</DropdownItemContentLabel>
          )}
        </DropdownItemContent>
        {contentValue}
      </DropdownLinkItem>
    );
  });
}

export default function ExploreDropdown({ hints, visible, selectedIndex }) {
  if (!visible) {
    return null;
  }

  return (
    <DropdownFlexColumn gap={8} className="explore-dropdown">
      {hints.map((hint, index) => (
        <DropdownGroup key={hint.type}>
          <DropdownGroupTitle>{hint.type}</DropdownGroupTitle>
          <ExploreDropdownItem
            type={hint.type}
            value={hint.value}
            selected={index === selectedIndex}
          />
        </DropdownGroup>
      ))}
    </DropdownFlexColumn>
  );
}
