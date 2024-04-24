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
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { first } from "lodash";
import { useEffectOnce } from "../../../utils/hooks/useEffectOnce";
import { flex_1, p_x, p_y, truncate } from "../../../styles/tailwindcss";
import AddressOrIdentity from "../../address";
import * as queryString from "query-string";
import {
  ACCOUNT_IDENTITY_TAB_NAME,
  ACCOUNT_IDENTITY_TAB_SUBTAB,
} from "../../../utils/constants";

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

  &:hover {
    background-color: ${(p) => p.theme.fillPopupHover};
  }

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

const IdentitysWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const IdentitysRowWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0 8px 16px;
  gap: 8px;
  cursor: pointer;
  :hover {
    background: ${(p) => p.theme.fillPopupHover};
  }
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
  };

  return typeMap[type] ?? {};
}

function ExploreDropdownItem({
  value,
  type,
  selected,
  setSelected = noop,
  setHintsKeyMap = noop,
}) {
  const dispatch = useDispatch();

  const items = Array.isArray(value) ? value : [value];

  useEffectOnce(() => {
    items.forEach((item, index) => {
      const key = `${type}-${index}`;
      setHintsKeyMap((o) => ({ ...o, [key]: { type, value: item } }));
    });
  });

  return items.map((item, index) => {
    const key = `${type}-${index}`;
    const { icon, label, contentValue } = renderItem(type, item);

    return (
      <DropdownLinkItem
        key={key}
        to={makeExploreDropdownItemRouteLink(type, item)}
        selected={key === selected}
        onClick={() => {
          dispatch(closeMobileMenu());
        }}
        onMouseEnter={() => setSelected(key)}
        onMouseOver={() => setSelected(key)}
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

function ExploreDropdown(
  { hints, identitys, visible, setSelectedItem = noop },
  ref,
) {
  useImperativeHandle(ref, () => ({ handleArrowNavigate }));

  const [selected, setSelected] = useState("");
  const [hintsKeyMap, setHintsKeyMap] = useState({});
  const keys = useMemo(() => Object.keys(hintsKeyMap), [hintsKeyMap]);

  useEffect(() => {
    setSelectedItem(hintsKeyMap[selected]);
  }, [selected, hintsKeyMap, setSelectedItem]);

  useEffect(() => {
    setSelected(first(Object.keys(hintsKeyMap)));
  }, [hintsKeyMap]);

  const selectedIndex = useMemo(
    () => keys.findIndex((k) => k === selected),
    [keys, selected],
  );

  function handleArrowNavigate(code = "") {
    if (code === "ArrowUp") {
      if (selectedIndex > 0) {
        setSelected(keys[selectedIndex - 1]);
      }
    } else if (code === "ArrowDown") {
      if (selectedIndex < keys.length - 1) {
        setSelected(keys[selectedIndex + 1]);
      }
    }
  }

  if (!visible) {
    return null;
  }

  const linkAccountPage = (address) => {
    let link = `/accounts/${address}`;
    link = `${link}?${queryString.stringify({
      tab: ACCOUNT_IDENTITY_TAB_NAME,
      sub: ACCOUNT_IDENTITY_TAB_SUBTAB.IDENTITY_TIMELINE,
    })}`;
    return link;
  };

  return (
    <DropdownFlexColumn gap={8} className="explore-dropdown">
      {hints.map((hint) => (
        <DropdownGroup key={hint.type}>
          <DropdownGroupTitle>{lowerCase(hint.type)}</DropdownGroupTitle>
          <ExploreDropdownItem
            type={hint.type}
            value={hint.value}
            selected={selected}
            setSelected={setSelected}
            setSelectedItem={setSelectedItem}
            setHintsKeyMap={setHintsKeyMap}
          />
        </DropdownGroup>
      ))}
      {identitys.length ? (
        <DropdownGroup key="identity">
          <DropdownGroupTitle>{lowerCase("identity")}</DropdownGroupTitle>
          <IdentitysWrapper>
            {identitys.map((identity) => (
              <Link
                key={identity.account}
                to={linkAccountPage(identity.account)}
                style={{ textDecoration: "none" }}
              >
                <IdentitysRowWrapper>
                  <AccountIcon />
                  <AddressOrIdentity
                    key={identity.account}
                    address={identity.account}
                    linkToIdentityTimeline
                  />
                </IdentitysRowWrapper>
              </Link>
            ))}
          </IdentitysWrapper>
        </DropdownGroup>
      ) : null}
    </DropdownFlexColumn>
  );
}

export default forwardRef(ExploreDropdown);
