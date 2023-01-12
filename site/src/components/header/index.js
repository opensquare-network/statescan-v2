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
  closeMobileMenu,
  mobileMenuFoldedSelector,
  toggle,
} from "../../store/reducers/mobileMenuSlice";
import { mdcss, mobilecss } from "../../styles/responsive";
import { useEffect } from "react";
import { menusAssets, menusBlockchain } from "../../utils/constants";
import { useWindowSize } from "@osn/common";
import ExploreInputOrigin from "../../components/home/explore/input";
import { useLocation } from "react-router";
import { MOBILE_SIZE } from "@osn/constants";
import { getChainModules } from "../../utils/chain";

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

  ${mobilecss(css`
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
`;
const ExploreInputPCWrapper = styled(ExploreInputWrapper)`
  margin-right: 16px;

  .explore-dropdown {
    right: 0;
    width: 234px;
  }

  ${mdcss(css`
    display: none;
  `)}
`;
const ExploreInputMobileWrapper = styled(ExploreInputWrapper)`
  margin-bottom: 16px;

  & .explore-dropdown {
    width: auto;
  }
`;
const ExploreInput = styled(ExploreInputOrigin)`
  display: inline-flex;
  flex: 1;
`;

export default function Header() {
  const showMobileMenu = !useSelector(mobileMenuFoldedSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const shouldShowPCExplore = location.pathname !== "/";
  const { assets } = getChainModules();

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > MOBILE_SIZE) {
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
                <SubMenu category="BlockChain" menus={menusBlockchain} />
              </MenuItem>
              {assets && (
                <MenuItem>
                  <SubMenu category="Assets" menus={menusAssets} />
                </MenuItem>
              )}
            </MenuWrapper>

            <Flex>
              {shouldShowPCExplore && (
                <ExploreInputPCWrapper>
                  <ExploreInput small />
                </ExploreInputPCWrapper>
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
              <ExploreInputMobileWrapper>
                <ExploreInput />
              </ExploreInputMobileWrapper>

              <ChainSwitch />
              <Navi />
            </MobileMenuWrapper>
          )}
        </Mobile>
      </FlexBetween>
    </Wrapper>
  );
}
