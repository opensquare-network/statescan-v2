import { getChainModules } from "../chain";

export const identitySubMenus = [
  {
    name: "Identities",
    value: "identities",
  },
  {
    name: "Judgements",
    value: "identities/judgements",
  },
  {
    name: "Registrars",
    value: "identities/registrars",
  },
];

export const multisigSubMenus = [
  {
    name: "Accounts",
    value: "multisig/accounts",
  },
  {
    name: "Multisigs",
    value: "multisigs",
  },
];

const identityMenus = {
  type: "group",
  title: "Identity",
  menus: identitySubMenus,
};

const divider = {
  type: "divider",
};

const multisigMenus = {
  type: "group",
  title: "MultiSig",
  menus: multisigSubMenus,
};

export const vestingMenu = {
  name: "Vestings",
  value: "vestings",
};

export const recoverySubMenus = [
  {
    name: "Proxies",
    value: "proxies",
  },
  {
    name: "Recoverables",
    value: "recoverables",
  },
  {
    name: "Recoveries",
    value: "recoveries",
  },
];

const recoveryMenus = {
  type: "group",
  title: "Recovery",
  menus: recoverySubMenus,
};

export const proxyMenu = {
  name: "Proxy",
  value: "proxy",
};

export default function getBusinessMenus() {
  const { identity, multisig, vestings, recovery, proxy } = getChainModules();
  const hasDivider = identity && multisig;

  const menus = [];

  if (identity) {
    menus.push(identityMenus);
  }

  if (hasDivider) {
    menus.push(divider);
  }

  if (multisig) {
    menus.push(multisigMenus);
  }

  if (recovery) {
    if (menus.length > 0) {
      menus.push(divider);
    }
    menus.push(recoveryMenus);
  }

  if (vestings) {
    if (menus.length > 0) {
      menus.push(divider);
    }
    menus.push(vestingMenu);
  }

  if (proxy) {
    if (menus.length > 0) {
      menus.push(divider);
    }
    menus.push(proxyMenu);
  }

  return menus;
}
