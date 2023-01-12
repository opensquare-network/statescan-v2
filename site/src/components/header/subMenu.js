import { useState, useRef, Fragment } from "react";
import { Inter_14_500 } from "../../styles/text";
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

export default function SubMenu({
  category,
  menus,
  closeMenu,
  divideIndex = 2,
}) {
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
            {menus.map((item, index) => {
              return (
                <Fragment key={index}>
                  {index === divideIndex && <Divider />}
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
                </Fragment>
              );
            })}
          </MenuWrapper>
        </MouseWrapper>
      )}
    </Wrapper>
  );
}
