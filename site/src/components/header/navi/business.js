import { getChainModules } from "../../../utils/chain";
import styled from "styled-components";
import { Inter_14_600 } from "../../../styles/text";
import Menus from "./menus";
import {
  identitySubMenus,
  multisigSubMenus,
  proxyMenu,
  recoverySubMenus,
  vestingMenu,
} from "../../../utils/consts/menu";
import noop from "lodash.noop";

const MenuLabel = styled.div`
  margin-top: 24px;
  ${Inter_14_600};
  color: ${(p) => p.theme.fontTertiary};
  text-align: center;
`;

function IdentityMenu({ closeFunc = noop }) {
  const { identity } = getChainModules();
  if (!identity) {
    return null;
  }

  return (
    <>
      <MenuLabel>Identity</MenuLabel>
      <Menus menus={identitySubMenus} closeFunc={closeFunc} />
    </>
  );
}

function MultisigMenu({ closeFunc = noop }) {
  const { multisig } = getChainModules();
  if (!multisig) {
    return null;
  }

  return (
    <>
      <MenuLabel>Multisig</MenuLabel>
      <Menus menus={multisigSubMenus} closeFunc={closeFunc} />
    </>
  );
}

function RecoveryMenu({ closeFunc = noop }) {
  const { recovery } = getChainModules();
  if (!recovery) {
    return null;
  }

  return (
    <>
      <MenuLabel>Recovery</MenuLabel>
      <Menus menus={recoverySubMenus} closeFunc={closeFunc} />
    </>
  );
}

function VestingsMenu({ closeFunc = noop }) {
  const { vestings } = getChainModules();
  if (!vestings) {
    return null;
  }

  return (
    <>
      <MenuLabel>Vestings</MenuLabel>
      <Menus menus={[vestingMenu]} closeFunc={closeFunc} />
    </>
  );
}

function ProxyMenu({ closeFunc = noop }) {
  const { proxy } = getChainModules();
  if (!proxy) {
    return null;
  }

  return (
    <>
      <MenuLabel>Proxy</MenuLabel>
      <Menus menus={[proxyMenu]} closeFunc={closeFunc} />
    </>
  );
}

export default function BusinessNavi() {
  return (
    <>
      <IdentityMenu />
      <MultisigMenu />
      <RecoveryMenu />
      <VestingsMenu />
      <ProxyMenu />
    </>
  );
}
