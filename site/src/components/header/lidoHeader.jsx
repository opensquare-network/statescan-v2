import { Fragment } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Flex, FlexBetween } from "../styled/flex";
import ChainSwitch from "./chainSwitch";
import SubMenu from "./subMenu";
import BaseHeader, {
  HeaderMenuLink,
  HeaderMenuText,
  HeaderMenuWrapper,
} from "./baseHeader";
import Link from "../styled/link";
import { MenuItem, MenuLabel } from "./navi/common";
import Menus from "./navi/menus";
import { toggle } from "../../store/reducers/mobileMenuSlice";
import { mdcss } from "../../styles/responsive";
import LidoSearchInputOrigin from "../lido/searchInput";

const otherMenus = [{ name: "Locator", value: "locator" }];

const treasuryMenus = [
  { name: "Overview", value: "treasury" },
  { name: "Income", value: "treasury/income" },
];

const earnMenus = [
  { name: "earnETH", value: "earn/eth" },
  { name: "earnUSD", value: "earn/usd" },
];

const stethMenus = [
  { name: "Overview", value: "steth" },
  { name: "Deposits", value: "steth/deposits" },
  { name: "Withdrawals", value: "steth/withdrawals" },
  { name: "Withdrawal Queue", value: "steth/withdrawal-queue" },
  { name: "stETH Holders", value: "steth/holders" },
];

const wstethMenus = [
  { name: "Overview", value: "wsteth" },
  { name: "wstETH Wrap", value: "wsteth/wrap" },
  { name: "wstETH Unwrap", value: "wsteth/unwrap" },
  { name: "wstETH Holders", value: "wsteth/holders" },
];

const stakingMenus = [
  { name: "Overview", value: "staking" },
  { name: "Modules", value: "staking/modules" },
  { name: "Module Deposits", value: "staking/deposits" },
  { name: "Vaults", value: "staking/vaults" },
  { type: "divider" },
  {
    type: "group",
    title: "Reward vaults",
    menus: [
      { name: "CL withdrawal vault", value: "vaults/withdrawal" },
      { name: "EL rewards vault", value: "vaults/rewards" },
    ],
  },
];

const showExperimentalMenus =
  process.env.REACT_APP_PUBLIC_MODE !== "production";

const MobileMenuList = styled.div`
  min-width: 160px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
`;

const SearchInputPCWrapper = styled(SearchInputWrapper)`
  margin-right: 16px;
  width: 300px;

  .explore-dropdown {
    right: 0;
    width: 100%;
    top: 44px;
  }

  ${mdcss(css`
    display: none;
  `)}
`;

const SearchInputMobileWrapper = styled(SearchInputWrapper)`
  & .explore-dropdown {
    width: auto;
    top: 44px;
  }
`;

const LidoSearchInput = styled(LidoSearchInputOrigin)`
  display: inline-flex;
  flex: 1;
`;

function renderMobileMenus(item, closeMobileMenu) {
  if (item.type === "divider") {
    return null;
  }

  if (item.type === "group") {
    return (
      <Fragment key={item.title}>
        <MenuLabel>{item.title}</MenuLabel>
        <Menus menus={item.menus} closeFunc={closeMobileMenu} />
      </Fragment>
    );
  }

  return <Menus key={item.name} menus={[item]} closeFunc={closeMobileMenu} />;
}

export default function LidoHeader() {
  const location = useLocation();
  const dispatch = useDispatch();
  const shouldShowPCSearch = location.pathname !== "/";
  const closeMobileMenu = () => {
    dispatch(toggle());
  };

  return (
    <BaseHeader
      pc={
        <FlexBetween style={{ flex: 1 }}>
          <HeaderMenuWrapper>
            <HeaderMenuLink to="/">
              <HeaderMenuText>Home</HeaderMenuText>
            </HeaderMenuLink>
            <SubMenu category="stETH" menus={stethMenus} />
            <SubMenu category="wstETH" menus={wstethMenus} />
            <SubMenu category="Staking" menus={stakingMenus} />
            {showExperimentalMenus && (
              <>
                <SubMenu category="Treasury" menus={treasuryMenus} />
                <SubMenu category="Earn" menus={earnMenus} />
              </>
            )}
            <SubMenu category="Others" menus={otherMenus} />
          </HeaderMenuWrapper>

          <Flex>
            {shouldShowPCSearch && (
              <SearchInputPCWrapper>
                <LidoSearchInput small />
              </SearchInputPCWrapper>
            )}
            <ChainSwitch />
          </Flex>
        </FlexBetween>
      }
      mobile={
        <>
          <SearchInputMobileWrapper>
            <LidoSearchInput />
          </SearchInputMobileWrapper>

          <ChainSwitch />
          <MobileMenuList>
            <Link to="/" onClick={closeMobileMenu}>
              <MenuItem>Home</MenuItem>
            </Link>
            <MenuLabel>Staking</MenuLabel>
            <Menus menus={stakingMenus} closeFunc={closeMobileMenu} />
            {showExperimentalMenus && (
              <>
                <MenuLabel>Treasury</MenuLabel>
                {treasuryMenus.map((item) =>
                  renderMobileMenus(item, closeMobileMenu),
                )}
                <MenuLabel>Earn</MenuLabel>
                {earnMenus.map((item) =>
                  renderMobileMenus(item, closeMobileMenu),
                )}
              </>
            )}
            <MenuLabel>stETH</MenuLabel>
            {stethMenus.map((item) => renderMobileMenus(item, closeMobileMenu))}
            <MenuLabel>wstETH</MenuLabel>
            {wstethMenus.map((item) =>
              renderMobileMenus(item, closeMobileMenu),
            )}
            <MenuLabel>Others</MenuLabel>
            {otherMenus.map((item) => renderMobileMenus(item, closeMobileMenu))}
          </MobileMenuList>
        </>
      }
    />
  );
}
