import { useState, useRef } from "react";
import { Inter_12_600, Inter_14_500 } from "../../styles/text";
import styled, { css } from "styled-components";
import { Panel } from "../styled/panel";
import Link from "../styled/link";
import Divider from "../styled/divider";
import CaretDownIcon from "../icons/caretDownIcon";
import { HeaderMenuItem } from "./styled";

const Wrapper = styled(HeaderMenuItem)`
  position: relative;
`;

const TitleWrapper = styled.div`
  color: ${(p) => p.theme.fontPrimary};
  ${(p) =>
    p.isActive &&
    css`
      color: ${(p) => p.theme.theme500};

      svg path {
        stroke: ${(p) => p.theme.theme500};
      }
    `}
  cursor: pointer;

  :hover {
    color: ${(p) => p.themecolor};

    > svg {
      stroke: ${(p) => p.themecolor};
    }
  }

  display: flex;
  align-items: center;

  > svg {
    stroke: ${(p) => p.theme.fontPrimary};
    stroke-width: 1.5;
  }

  ${(p) =>
    p.isActive &&
    css`
      color: ${(p) => p.themecolor};

      > svg {
        stroke: ${(p) => p.themecolor};
      }
    `}
`;

const MouseWrapper = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  top: 100%;
`;

const MenuWrapper = styled(Panel)`
  min-width: 160px;
  overflow: hidden;
  padding: 8px 0;
  background: ${(p) => p.theme.fillPopup};
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  ${Inter_14_500};

  :hover {
    background: ${(p) => p.theme.fillPopupHover};
    color: ${(p) => p.theme.theme500};
  }

  ${(p) =>
    p.selected &&
    css`
      background: ${(p) => p.theme.fillPopupHover};
    `}
  ${(p) =>
    p.disabled &&
    css`
      background: ${(p) => p.theme.fillPanel};
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const SubMenuGroupTitle = styled.div`
  color: ${(p) => p.theme.fontTertiary};
  padding: 8px 12px;
  text-transform: uppercase;
  ${Inter_12_600};
`;
const SubMenuGroup = styled.div`
  ${MenuItem} {
    padding-left: 24px;
  }
`;

function SubMenuItems({ item, closeMenu, setIsActive }) {
  if (item.type === "divider") {
    return <Divider />;
  }

  if (item.type === "group") {
    return (
      <SubMenuGroup>
        <SubMenuGroupTitle>{item.title}</SubMenuGroupTitle>
        {item.menus.map((subMenuItem, subIdx) => (
          <SubMenuItems
            key={subIdx}
            item={subMenuItem}
            closeMenu={closeMenu}
            setIsActive={setIsActive}
          />
        ))}
      </SubMenuGroup>
    );
  }

  return (
    <Link to={`/${item.value}`}>
      <MenuItem
        onClick={() => {
          closeMenu && closeMenu();
          setIsActive(false);
        }}
        disabled={item.value === ""}
      >
        {item.name}
      </MenuItem>
    </Link>
  );
}

export default function SubMenu({ category, menus, closeMenu }) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();

  const onMouseOver = () => {
    setIsActive(true);
  };

  const onMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <Wrapper
      onMouseOver={onMouseOver}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseOut={onMouseLeave}
      role="button"
    >
      <TitleWrapper isActive={isActive}>
        {category}
        <CaretDownIcon />
      </TitleWrapper>
      {isActive && (
        <MouseWrapper>
          <div style={{ height: 4 }} />
          <MenuWrapper ref={ref}>
            {menus.map((menuItem, idx) => (
              <SubMenuItems
                key={idx}
                item={menuItem}
                closeMenu={closeMenu}
                setIsActive={setIsActive}
              />
            ))}
          </MenuWrapper>
        </MouseWrapper>
      )}
    </Wrapper>
  );
}
