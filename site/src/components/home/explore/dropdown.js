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
import { Flex } from "../../styled/flex";
import { makeExploreDropdownItemRouteLink } from "./utils";

const padding = 16;

const Dropdown = styled.div`
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
  };

  return typeMap[type] ?? {};
}

function ExploreDropdownItem({ value, type, selected }) {
  const { icon, label, contentValue } = renderItem(type, value);
  const dispatch = useDispatch();

  return (
    <DropdownLinkItem
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
        {label && <DropdownItemContentLabel>{label}</DropdownItemContentLabel>}
      </DropdownItemContent>
      {contentValue}
    </DropdownLinkItem>
  );
}

export default function ExploreDropdown({ hints, visible, selectedIndex }) {
  if (!visible) {
    return null;
  }

  return (
    <Dropdown className="explore-dropdown">
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
    </Dropdown>
  );
}
