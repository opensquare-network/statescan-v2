import Statemint from "../../components/icons/statemintIcon";
import Statemine from "../../components/icons/statemineIcon";
import Westmint from "../../components/icons/westmintIcon";
import { ReactComponent as Litentry } from "../../components/icons/litentry.svg";
import { ReactComponent as Litmus } from "../../components/icons/litmus.svg";
import { ReactComponent as Polkadot } from "../../components/icons/polkadot.svg";
import { ReactComponent as Kusama } from "../../components/icons/kusama.svg";
import { ReactComponent as Westend } from "../../components/icons/westend.svg";

/**
 * @description Collection for chain icons hook, will auto switch to dark mode icon
 * @returns ReactComponent
 */
export function useChainIcons() {
  return {
    Statemint,
    Litentry,
    Statemine,
    Litmus,
    Westmint,
    Polkadot,
    Kusama,
    Westend,
  };
}
