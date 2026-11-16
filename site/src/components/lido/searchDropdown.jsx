import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import noop from "lodash.noop";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { closeMobileMenu } from "../../store/reducers/mobileMenuSlice";
import { Inter_12_500, Inter_14_500, Inter_14_600 } from "../../styles/text";
import { mobilecss } from "../../styles/responsive";
import { FlexColumn } from "../styled/flex";
import { flex_1, p_x, p_y, truncate } from "../../styles/tailwindcss";
import EvmAddress from "./evmAddress";

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

const lidoSearchGroupLabels = {
  nodeOperators: "node operators",
  stakingModules: "staking modules",
  stETHHolders: "stETH holders",
  wstETHHolders: "wstETH holders",
};

export function makeLidoSearchRouteLink(type, value) {
  if (type === "nodeOperators") {
    const [stakingModuleId, nodeOperatorId] = String(value.id || "").split("-");
    return `/staking/modules/${stakingModuleId}/node-operators/${nodeOperatorId}`;
  }

  if (type === "stakingModules") {
    return `/staking/modules/${value.id}`;
  }

  if (type === "stETHHolders" || type === "wstETHHolders") {
    return `/addresses/${value.id || value.address}`;
  }

  return "/";
}

function renderItem(type, value) {
  if (type === "nodeOperators" || type === "stakingModules") {
    return {
      label: value?.name,
      contentValue: (
        <DropdownItemContentValue>#{value?.id}</DropdownItemContentValue>
      ),
    };
  }

  if (type === "stETHHolders" || type === "wstETHHolders") {
    return {
      contentValue: (
        <DropdownItemContentValue>
          <EvmAddress
            address={value?.id || value?.address}
            copy={false}
            noLink
            maxWidth="100%"
          />
        </DropdownItemContentValue>
      ),
    };
  }

  return {};
}

function LidoSearchDropdownGroup({
  hint = {},
  selectedHintKey,
  setSelectedHintKey = noop,
}) {
  const items = hint.value || [];

  if (!items.length) {
    return null;
  }

  return (
    <DropdownGroup key={hint.type}>
      <DropdownGroupTitle>
        {lidoSearchGroupLabels[hint.type] || hint.type}
      </DropdownGroupTitle>
      {items.map((item, idx) => (
        <LidoSearchDropdownItem
          key={`${hint.type}-${idx}`}
          type={hint.type}
          item={item}
          idx={idx}
          selectedHintKey={selectedHintKey}
          setSelectedHintKey={setSelectedHintKey}
        />
      ))}
    </DropdownGroup>
  );
}

function LidoSearchDropdownItem({
  type,
  idx,
  item,
  selectedHintKey,
  setSelectedHintKey = noop,
}) {
  const dispatch = useDispatch();
  const itemKey = `${type}-${idx}`;
  const { label, contentValue } = renderItem(type, item);
  const selected = itemKey === selectedHintKey;

  return (
    <DropdownLinkItem
      to={makeLidoSearchRouteLink(type, item)}
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
      {label && <DropdownItemContentLabel>{label}</DropdownItemContentLabel>}
      {contentValue}
    </DropdownLinkItem>
  );
}

function LidoSearchDropdown(
  {
    hints,
    hintsKeys = [],
    visible,
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
    if (code === "ArrowUp" && selectedIndex > 0) {
      setSelectedHintKey(hintsKeys[selectedIndex - 1]);
    } else if (code === "ArrowDown" && selectedIndex < hintsKeys.length - 1) {
      setSelectedHintKey(hintsKeys[selectedIndex + 1]);
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <DropdownFlexColumn gap={8} className="explore-dropdown">
      {hints.map((hint, idx) => (
        <LidoSearchDropdownGroup
          key={`${hint.type}-${idx}`}
          hint={hint}
          selectedHintKey={selectedHintKey}
          setSelectedHintKey={setSelectedHintKey}
        />
      ))}
    </DropdownFlexColumn>
  );
}

export default forwardRef(LidoSearchDropdown);
