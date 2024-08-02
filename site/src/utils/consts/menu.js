import { getChainModules } from "../chain";

const identityMenus = {
  type: "group",
  title: "Identity",
  menus: [
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
  ],
};

const divider = {
  type: "divider",
};

const multisigMenus = {
  type: "group",
  title: "MultiSig",
  menus: [
    {
      name: "Accounts",
      value: "multisig/accounts",
    },
    {
      name: "Multisigs",
      value: "multisigs",
    },
  ],
};

const vestingMenu = {
  name: "Vestings",
  value: "vestings",
};

const recoveryMenus = {
  type: "group",
  title: "Recovery",
  menus: [
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
  ],
};

const proxyMenu = {
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
