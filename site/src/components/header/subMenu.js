import { useState, useRef, Fragment } from "react";
import { Inter_14_500 } from "../../styles/text";
import styled, { css } from "styled-components";
import { Panel } from "../styled/panel";
import Link from "../styled/link";

const Wrapper = styled.div`
  position: relative;

  :not(:first-child) {
    margin-left: 40px;
  }

  @media screen and (max-width: 900px) {
    :not(:first-child) {
      padding: 6px 12px;
      margin-left: 0;
    }
  }
`;

const TitleWrapper = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  text-decoration: none;
  color: ${(p) => p.theme.fontPrimary};
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
    `} @media screen and(max-width: 900 px) {
    padding: 6px 12px;
    cursor: auto;

    :hover {
      color: inherit;
    }

    > svg {
      display: none;
    }
  }
`;

const MouseWrapper = styled(Panel)`
  z-index: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 0;
  @media screen and (max-width: 900px) {
    position: static;
    left: 0;
    transform: none;
    padding-top: 0;
  }
  overflow: hidden;
  background: ${(p) => p.theme.fillPopup};
`;

const MenuWrapper = styled.div`
  min-width: 160px;
  background: ${(p) => p.theme.fillPopup};
  @media screen and (max-width: 900px) {
    position: static;
    box-shadow: none;
    transform: none;
    padding: 0;
    border: none;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  ${Inter_14_500};

  :hover {
    background: ${(p) => p.theme.fillPopupHover};
    color: ${(p) => p.theme.fontPrimary};
  }

  @media screen and (max-width: 900px) {
    padding: 8px 12px 8px 24px;
    color: rgba(17, 17, 17, 0.65);
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
      <TitleWrapper isActive={isActive}>{category}</TitleWrapper>
      {isActive && (
        <MouseWrapper>
          <MenuWrapper ref={ref}>
            {menus.map((item, index) => (
              <Fragment key={index}>
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
            ))}
          </MenuWrapper>
        </MouseWrapper>
      )}
    </Wrapper>
  );
}
