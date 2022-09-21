import { useState, useEffect, useRef, Fragment } from "react";
import styled, { css } from "styled-components";
import { useWindowSize } from "../../utils/hooks";
import Link from "../styled/link";
import { Panel } from "../styled/panel";
import { Inter_14_500 } from "../../styles/text";

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
`;

const MenuWrapper = styled.div`
  min-width: 160px;
  background: ${(p) => p.theme.fillPanel};
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
    background: ${(p) => p.theme.fillPanelHover};
    color: ${(p) => p.theme.fontPrimary};
  }

  @media screen and (max-width: 900px) {
    padding: 8px 12px 8px 24px;
    color: rgba(17, 17, 17, 0.65);
  }
  ${(p) =>
    p.selected &&
    css`
      background: ${(p) => p.theme.fillPanelHover};
    `}
  ${(p) =>
    p.disabled &&
    css`
      background: ${(p) => p.theme.fillPanel};
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const SubMenuItem = styled(MenuItem)`
  padding: 8px 24px;
`;

const Divider = styled.div`
  margin: 8px 0;
  height: 1px;
  background: ${(p) => p.theme.fillBase};
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export default function SubMenu({
  category,
  menus,
  closeMenu,
  divideIndex = 2,
}) {
  const [isActive, setIsActive] = useState(false);
  const { width } = useWindowSize();
  const ref = useRef();

  useEffect(() => {
    if (width <= 900) {
      setIsActive(false);
    }
  }, [width]);

  const onMouseOver = () => {
    if (width > 900) {
      setIsActive(true);
    }
  };

  const onMouseLeave = () => {
    if (width > 900) {
      setIsActive(false);
    }
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
                      closeMenu();
                      setIsActive(false);
                    }}
                    disabled={item.value === ""}
                  >
                    {item.name}
                  </MenuItem>
                </Link>
                {index === divideIndex && <Divider />}
                {(item.children ?? []).map((child, index) => {
                  return (
                    <Fragment key={index}>
                      <Link to={`/${child.value}`}>
                        <SubMenuItem
                          onClick={() => {
                            closeMenu();
                            setIsActive(false);
                          }}
                          disabled={child.value === ""}
                        >
                          {child.name}
                        </SubMenuItem>
                      </Link>
                    </Fragment>
                  );
                })}
              </Fragment>
            ))}
          </MenuWrapper>
        </MouseWrapper>
      )}
    </Wrapper>
  );
}
