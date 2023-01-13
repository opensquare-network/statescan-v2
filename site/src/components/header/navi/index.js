import { toggle } from "../../../store/reducers/mobileMenuSlice";
import {
  menusAssets,
  menusAssetsDestroyed,
  menusBlockchain,
} from "../../../utils/constants";
import { Inter_14_600 } from "../../../styles/text";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import Link from "../../styled/link";
import { Fragment } from "react";

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

const MenuItem = styled(MenuLabel)`
  margin-top: 16px;
  cursor: pointer;
  color: ${(p) => p.theme.fontPrimary};
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

function MenuLinkItem({ item = {}, closeMobileMenu }) {
  if (!item.name) {
    return null;
  }

  return (
    <Link to={`/${item.value}`} onClick={closeMobileMenu}>
      <MenuItem disabled={!item.value}>{item.name}</MenuItem>
    </Link>
  );
}

export default function Navi() {
  const dispatch = useDispatch();
  const closeMobileMenu = () => {
    dispatch(toggle());
  };

  return (
    <MenuWrapper>
      <Link to={`/`} onClick={closeMobileMenu}>
        <MenuItem>Home</MenuItem>
      </Link>

      <MenuLabel>Blockchain</MenuLabel>
      {menusBlockchain.map((item, idx) => (
        <MenuLinkItem key={idx} item={item} closeMobileMenu={closeMobileMenu} />
      ))}

      <MenuLabel>Assets</MenuLabel>
      {menusAssets.map((item, idx) => (
        <MenuLinkItem key={idx} item={item} closeMobileMenu={closeMobileMenu} />
      ))}

      <MenuLabel>Destroyed</MenuLabel>
      {menusAssetsDestroyed.map((item, idx) => (
        <MenuLinkItem key={idx} item={item} closeMobileMenu={closeMobileMenu} />
      ))}
    </MenuWrapper>
  );
}
