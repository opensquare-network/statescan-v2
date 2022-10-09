import { ReactComponent as StatemintIcon } from "../../components/icons/statemint.svg";
import { ReactComponent as StatemintDarkIcon } from "../../components/icons/statemint-dark.svg";
import { ReactComponent as Litentry } from "../../components/icons/litentry.svg";
import { ReactComponent as StatemineIcon } from "../../components/icons/statemine.svg";
import { ReactComponent as StatemineDarkIcon } from "../../components/icons/statemine-dark.svg";
import { ReactComponent as Litmus } from "../../components/icons/litmus.svg";
import { ReactComponent as WestmintIcon } from "../../components/icons/westmint.svg";
import { ReactComponent as WestmintDarkIcon } from "../../components/icons/westmint-dark.svg";
import { ReactComponent as Polkadot } from "../../components/icons/polkadot.svg";
import { ReactComponent as Kusama } from "../../components/icons/kusama.svg";
import { ReactComponent as Westend } from "../../components/icons/westend.svg";
import { useMemo } from "react";
import { useIsDark } from ".";

/**
 * @description Collection for chain icons hook, will auto switch to dark mode icon
 * @returns ReactComponent
 */
export function useChainIcons() {
  const isDark = useIsDark();

  const Statemint = useMemo(
    () => (isDark ? StatemintDarkIcon : StatemintIcon),
    [isDark],
  );

  const Statemine = useMemo(
    () => (isDark ? StatemineDarkIcon : StatemineIcon),
    [isDark],
  );

  const Westmint = useMemo(
    () => (isDark ? WestmintDarkIcon : WestmintIcon),
    [isDark],
  );

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
