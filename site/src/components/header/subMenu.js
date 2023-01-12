import { useState, useRef } from "react";
import { Inter_12_600, Inter_14_500 } from "../../styles/text";
import styled, { css } from "styled-components";
import { Panel } from "../styled/panel";
import Link from "../styled/link";
import { ReactComponent as CaretDown } from "./caret-down.svg";
import Divider from "../styled/divider";

const CaretDownIcon = styled(CaretDown)`
  margin-left: 4px;
`;

const Wrapper = styled.div`
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

const MouseWrapper = styled(Panel)`
  z-index: 10;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 0;
  overflow: hidden;
  background: ${(p) => p.theme.fillPopup};
`;

const MenuWrapper = styled.div`
  min-width: 160px;
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
        <SubMenuGroupTitle>{item.name}</SubMenuGroupTitle>
        {item.menus.map((subMenuItem, subIdx) => (
          <SubMenuItems key={subIdx} item={subMenuItem} />
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
    <Wrapper onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <TitleWrapper isActive={isActive}>
        {category}
        <CaretDownIcon />
      </TitleWrapper>
      {isActive && (
        <MouseWrapper>
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
