import { Flex, FlexBetween } from "../styled/flex";
import styled, { css } from "styled-components";
import ChainSwitch from "./chainSwitch";
import SubMenu from "./subMenu";
import Navi from "./navi";
import { mdcss } from "../../styles/responsive";
import {
  menusAssetsAndUniques,
  menusBlockchain,
  menusBlockchainSimpleMode,
} from "../../utils/constants";
import ExploreInputOrigin from "../../components/home/explore/input";
import { useLocation } from "react-router";
import {
  getChainModules,
  hasBusiness,
  getFilteredMenus,
} from "../../utils/chain";
import NodeSwitch from "../nodeSwitch";
import MobileNodeSwitch from "./mobileNodeSwitch";
import { getIsSimpleMode } from "../../utils/env";
import getBusinessMenus from "../../utils/consts/menu";
import BaseHeader, {
  HeaderMenuLink,
  HeaderMenuText,
  HeaderMenuWrapper,
} from "./baseHeader";

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

function getBlockchainMenus(isSimpleMode) {
  if (isSimpleMode) {
    return getFilteredMenus(menusBlockchainSimpleMode);
  }

  return menusBlockchain;
}

export default function DefaultHeader() {
  const location = useLocation();
  const shouldShowPCExplore = location.pathname !== "/";
  const { assets, uniques } = getChainModules();
  const isSimpleMode = getIsSimpleMode();
  const blockchainMenus = getBlockchainMenus(isSimpleMode);

  return (
    <BaseHeader
      pc={
        <FlexBetween style={{ flex: 1 }}>
          <HeaderMenuWrapper>
            <HeaderMenuLink to={"/"}>
              <HeaderMenuText>Home</HeaderMenuText>
            </HeaderMenuLink>
            <SubMenu category="BlockChain" menus={blockchainMenus} />
            {assets && uniques ? (
              <SubMenu category="Assets" menus={menusAssetsAndUniques} />
            ) : null}
            {hasBusiness() && (
              <SubMenu category="Business" menus={getBusinessMenus()} />
            )}
          </HeaderMenuWrapper>

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
      }
      mobile={
        <>
          <ExploreInputMobileWrapper>
            <ExploreInput />
          </ExploreInputMobileWrapper>

          <ChainSwitch />
          <MobileNodeSwitch />
          <Navi />
        </>
      }
    />
  );
}
