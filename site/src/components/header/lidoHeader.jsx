import { Fragment } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FlexBetween } from "../styled/flex";
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

const otherMenus = [
  {
    type: "group",
    title: "Vaults",
    menus: [
      { name: "CL withdrawal vault", value: "vaults/withdrawal" },
      { name: "EL rewards vault", value: "vaults/rewards" },
    ],
  },
  { type: "divider" },
  { name: "Locator", value: "locator" },
  { type: "divider" },
  { name: "Staking Vaults", value: "staking/vaults" },
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

const moduleMenus = [
  { name: "Staking Modules", value: "staking/modules" },
  { name: "Module Deposits", value: "staking/deposits" },
];

const MobileMenuList = styled.div`
  min-width: 160px;
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
  const dispatch = useDispatch();
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
            <SubMenu category="Modules" menus={moduleMenus} />
            <SubMenu category="Others" menus={otherMenus} />
          </HeaderMenuWrapper>

          <ChainSwitch />
        </FlexBetween>
      }
      mobile={
        <>
          <ChainSwitch />
          <MobileMenuList>
            <Link to="/" onClick={closeMobileMenu}>
              <MenuItem>Home</MenuItem>
            </Link>
            <MenuLabel>Modules</MenuLabel>
            <Menus menus={moduleMenus} closeFunc={closeMobileMenu} />
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
