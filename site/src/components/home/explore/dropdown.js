import { capitalize } from "lodash";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Inter_12_500, Inter_14_600 } from "../../../styles/text";
import { mobileCss } from "../../../utils/mobileCss";
import AccountIcon from "../../icons/accountIcon";
import BlockIcon from "../../icons/blockIcon";
import { Flex } from "../../styled/flex";

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

  ${mobileCss(css`
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
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  height: 44px;
  margin: 0 -${padding}px;
  padding: 0 ${padding}px;

  &:hover {
    background-color: ${(p) => p.theme.fillSub};
  }
`;
const DropdownItemContent = styled(Flex)``;
const DropdownItemContentIconWrapper = styled.div`
  display: inline-flex;
  margin-right: 8px;
`;
const DropdownItemContentDescription = styled.span`
  word-break: break-all;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
`;
const DropdownItemSuffix = styled.div`
  color: ${(p) => p.theme.fontTertiary};
`;

// FIXME: should support more type in future
function renderItem(type, value) {
  const typeMap = {
    block: {
      icon: <BlockIcon />,
      description: capitalize(type),
      suffix: <DropdownItemSuffix>{value}</DropdownItemSuffix>,
    },
    extrinsic: {
      description: value,
    },
    account: {
      icon: <AccountIcon />,
      description: value,
    },
  };

  return typeMap[type] ?? {};
}

function ExploreDropdownItem({ value, type }) {
  const { icon, description, suffix } = renderItem(type, value);

  return (
    <DropdownLinkItem to={`/${type}/${value}`}>
      <DropdownItemContent>
        {icon && (
          <DropdownItemContentIconWrapper>
            {icon}
          </DropdownItemContentIconWrapper>
        )}
        {description && (
          <DropdownItemContentDescription>
            {description}
          </DropdownItemContentDescription>
        )}
      </DropdownItemContent>
      {suffix}
    </DropdownLinkItem>
  );
}

export default function ExploreDropdown({ hints, visible }) {
  if (!visible) {
    return null;
  }

  return (
    <Dropdown>
      {hints.map((hint) => (
        <DropdownGroup key={hint.type}>
          <DropdownGroupTitle>{hint.type}</DropdownGroupTitle>
          <ExploreDropdownItem type={hint.type} value={hint.value} />
        </DropdownGroup>
      ))}
    </Dropdown>
  );
}
