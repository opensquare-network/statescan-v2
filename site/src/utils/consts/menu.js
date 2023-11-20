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

export default function getBusinessMenus() {
  const { identity, multisig } = getChainModules();
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

  return menus;
}
