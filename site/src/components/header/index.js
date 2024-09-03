import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "./logo.svg";
import { Flex, FlexBetween } from "../styled/flex";
import { Mobile, PC } from "../styled/responsive";
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
import {
  menusAssets,
  menusBlockchain,
  menusBlockchainSimpleMode,
} from "../../utils/constants";
import { useWindowSize } from "@osn/common";
import ExploreInputOrigin from "../../components/home/explore/input";
import { useLocation } from "react-router";
import { MOBILE_SIZE } from "@osn/constants";
import { getChainModules } from "../../utils/chain";
import { useScrollLock } from "../../utils/hooks/useScrollLock";
import { HeaderMenuItem } from "./styled";
import NodeSwitch from "../nodeSwitch";
import MobileNodeSwitch from "./mobileNodeSwitch";
import { getIsSimpleMode } from "../../utils/env";
import getBusinessMenus from "../../utils/consts/menu";

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

const MenuItem = styled(HeaderMenuItem)``;

const MobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  gap: 16px;
`;

const ExploreInputWrapper = styled.div`
  position: relative;
  display: flex;
`;
const ExploreInputPCWrapper = styled(ExploreInputWrapper)`
  margin-right: 16px;
  width: 240px;

  .explore-dropdown {
    right: 0;
    width: 100%;
    top: 44px;
  }

  ${mdcss(css`
    display: none;
  `)}
`;
const ExploreInputMobileWrapper = styled(ExploreInputWrapper)`
  & .explore-dropdown {
    width: auto;
    top: 44px;
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
  const { assets, identity, multisig, recovery, vestings, proxy } =
    getChainModules();
  const isSimpleMode = getIsSimpleMode();

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > MOBILE_SIZE) {
      dispatch(closeMobileMenu());
    }
  }, [dispatch, width]);

  const [, setIsLock] = useScrollLock();
  useEffect(() => setIsLock(showMobileMenu), [showMobileMenu, setIsLock]);

  return (
    <Wrapper>
      <FlexBetween style={{ flex: 1 }}>
        <Link
          to={"/"}
          onClick={() => {
            dispatch(closeMobileMenu());
          }}
        >
          <StyleLogo />
        </Link>

        <PC>
          <FlexBetween style={{ flex: 1 }}>
            <MenuWrapper>
              <Link to={"/"}>
                <MenuItem>Home</MenuItem>
              </Link>
              <SubMenu
                category="BlockChain"
                menus={
                  isSimpleMode ? menusBlockchainSimpleMode : menusBlockchain
                }
              />
              {assets && <SubMenu category="Assets" menus={menusAssets} />}
              {(identity || multisig || recovery || vestings || proxy) && (
                <SubMenu category="Business" menus={getBusinessMenus()} />
              )}
            </MenuWrapper>

            <Flex>
              {shouldShowPCExplore && (
                <ExploreInputPCWrapper>
                  <ExploreInput small />
                </ExploreInputPCWrapper>
              )}
              <Flex gap={8}>
                <ChainSwitch />
                <NodeSwitch />
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
              <MobileNodeSwitch />
              <Navi />
            </MobileMenuWrapper>
          )}
        </Mobile>
      </FlexBetween>
    </Wrapper>
  );
}
