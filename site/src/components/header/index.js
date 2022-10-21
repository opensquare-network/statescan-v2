import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "./logo.svg";
import { Flex, FlexBetween } from "../styled/flex";
import { Mobile, PC } from "../styled/responsive";
import { Inter_14_600 } from "../../styles/text";
import styled, { css } from "styled-components";
import MobileButton from "./mobile/button";
import ChainSwitch from "./chainSwitch";
import LinkOrigin from "../styled/link";
import SubMenu from "./subMenu";
import Navi from "./navi";
import {
  mobileMenuFoldedSelector,
  toggle,
  closeMobileMenu,
} from "../../store/reducers/mobileMenuSlice";
import { mobileCss } from "../../utils/mobileCss";
import { useEffect } from "react";
import { menusBlockchain } from "../../utils/constants";
import { useWindowSize } from "@osn/common";
import ExploreInputOrigin from "../../components/home/explore/input";
import { useLocation } from "react-router";

const headerHeight = 68;

const StyleLogo = styled(Logo)`
  path {
    fill: ${(props) => props.theme.fontPrimary};
  }
`;

const Link = styled(LinkOrigin)`
  display: block;
`;

const Wrapper = styled(FlexBetween)`
  margin: 0 auto;
  height: ${headerHeight}px;
`;

const MenuWrapper = styled(Flex)`
  margin-left: 64px;
`;

const MenuItem = styled.div`
  ${Inter_14_600};
  cursor: pointer;
  text-decoration: none;
  padding: 8px 12px;
`;

const MobileMenuWrapper = styled.div`
  padding: 0 24px;
  background-color: ${(p) => p.theme.fillPanel};

  ${mobileCss(css`
    padding: 0 16px;
  `)}

  box-sizing: border-box;
  position: fixed !important;
  top: ${headerHeight}px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  z-index: 2;
`;

const ExploreInputWrapper = styled.div`
  position: relative;
  display: flex;
  margin-right: 16px;

  .explore-dropdown {
    right: 0;
    width: 234px;
  }

  ${mobileCss(css`
    margin-bottom: 16px;
    margin-right: 0;
    .explore-dropdown {
      width: auto;
    }
  `)}
`;
const ExploreInput = styled(ExploreInputOrigin)`
  display: inline-flex;
  flex: 1;
  width: 240px;
`;

export default function Header() {
  const showMobileMenu = !useSelector(mobileMenuFoldedSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const shouldShowPCExplore = location.pathname !== "/";

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 600) {
      dispatch(closeMobileMenu());
    }
  }, [dispatch, width]);

  return (
    <Wrapper>
      <FlexBetween style={{ flex: 1 }}>
        <Link
          to={`/`}
          onClick={() => {
            dispatch(closeMobileMenu());
          }}
        >
          <StyleLogo />
        </Link>

        <PC>
          <FlexBetween style={{ flex: 1 }}>
            <MenuWrapper>
              <Link to={`/`}>
                <MenuItem>Home</MenuItem>
              </Link>
              <MenuItem>
                <SubMenu
                  category="BlockChain"
                  menus={menusBlockchain}
                  divideIndex={4}
                />
              </MenuItem>
            </MenuWrapper>

            <Flex>
              {shouldShowPCExplore && (
                <ExploreInputWrapper>
                  <ExploreInput small />
                </ExploreInputWrapper>
              )}
              <Flex>
                <ChainSwitch />
              </Flex>
            </Flex>
          </FlexBetween>
        </PC>

        <Mobile>
          <MobileButton
            onClick={() => {
              dispatch(toggle());
            }}
            mobileMenuFolded={!showMobileMenu}
          />
          {showMobileMenu && (
            <MobileMenuWrapper>
              <ExploreInputWrapper>
                <ExploreInput />
              </ExploreInputWrapper>

              <ChainSwitch />
              <Navi />
            </MobileMenuWrapper>
          )}
        </Mobile>
      </FlexBetween>
    </Wrapper>
  );
}
