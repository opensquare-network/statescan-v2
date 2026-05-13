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
import { toggle } from "../../store/reducers/mobileMenuSlice";

const lidoMenus = [
  { name: "Deposits", value: "deposits" },
  { name: "Withdrawals", value: "withdrawals" },
  { name: "Withdrawal Vault", value: "withdrawal-vault" },
  { name: "Rewards Vault", value: "rewards-vault" },
  { name: "Staking Vaults", value: "staking-vaults" },
  {
    type: "group",
    title: "Staking Router",
    menus: [
      { name: "Staking Modules", value: "staking-modules" },
      { name: "Module Deposits", value: "module-deposits" },
    ],
  },
];

const MobileMenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function getMenuPath(value) {
  if (!value) {
    return "/";
  }

  return `/${value}`;
}

function renderMobileMenuItem(item, closeMobileMenu) {
  if (item.type === "divider") {
    return null;
  } else if (item.type === "group") {
    return item.menus.map((subItem) =>
      renderMobileMenuItem(subItem, closeMobileMenu),
    );
  }

  return (
    <HeaderMenuLink
      key={item.name}
      to={getMenuPath(item.value)}
      onClick={closeMobileMenu}
    >
      <HeaderMenuText>{item.name}</HeaderMenuText>
    </HeaderMenuLink>
  );
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
            <SubMenu category="BlockChain" menus={lidoMenus} />
          </HeaderMenuWrapper>

          <ChainSwitch />
        </FlexBetween>
      }
      mobile={
        <>
          <ChainSwitch />
          <MobileMenuList>
            <HeaderMenuLink to="/" onClick={closeMobileMenu}>
              <HeaderMenuText>Home</HeaderMenuText>
            </HeaderMenuLink>
            {lidoMenus.map((item) =>
              renderMobileMenuItem(item, closeMobileMenu),
            )}
          </MobileMenuList>
        </>
      }
    />
  );
}
