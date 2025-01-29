import { toggle } from "../../../store/reducers/mobileMenuSlice";
import {
  assetsMenuItem,
  destroyedAssetsMenuItem,
  destroyedUniquesMenuItem,
  dividerMenuItem,
  menusBlockchain,
  uniquesMenuItem,
} from "../../../utils/constants";
import { Inter_14_600 } from "../../../styles/text";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Link from "../../styled/link";
import { getChainModules, hasBusiness } from "../../../utils/chain";
import { MenuItem } from "./common";
import Menus from "./menus";
import BusinessNavi from "./business";

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

const MenuLabel = styled.div`
  margin-top: 24px;
  ${Inter_14_600};
  color: ${(p) => p.theme.fontTertiary};
  text-align: center;
`;

function useAssetsRelatedMenu() {
  const { assets, uniques } = getChainModules();
  const menus = [];
  if (assets) {
    menus.push(assetsMenuItem);
  }
  if (uniques) {
    menus.push(dividerMenuItem, uniquesMenuItem);
  }
  return menus;
}

function useAssetsDestroyedRelatedMenu() {
  const { assets, uniques } = getChainModules();
  const menus = [];
  if (assets) {
    menus.push(destroyedAssetsMenuItem);
  }
  if (uniques) {
    menus.push(destroyedUniquesMenuItem);
  }

  return menus;
}

export default function Navi() {
  const dispatch = useDispatch();
  const closeMobileMenu = () => {
    dispatch(toggle());
  };

  const assetsRelatedMenu = useAssetsRelatedMenu();
  const destroyedAssetsRelatedMenu = useAssetsDestroyedRelatedMenu();

  return (
    <MenuWrapper>
      <Link to={"/"} onClick={closeMobileMenu}>
        <MenuItem>Home</MenuItem>
      </Link>

      <MenuLabel>Blockchain</MenuLabel>
      <Menus menus={menusBlockchain} closeFunc={closeMobileMenu} />

      <MenuLabel>Assets</MenuLabel>
      <Menus menus={assetsRelatedMenu} closeFunc={closeMobileMenu} />

      <MenuLabel>Destroyed</MenuLabel>
      <Menus menus={destroyedAssetsRelatedMenu} closeFunc={closeMobileMenu} />

      {hasBusiness() ? <BusinessNavi /> : null}
    </MenuWrapper>
  );
}
