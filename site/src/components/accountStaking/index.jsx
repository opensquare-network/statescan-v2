import { useCallback, useMemo } from "react";
import { Panel } from "../styled/panel";
import { useQueryParams } from "../../hooks/useQueryParams";
import useQueryParamsUpdater from "../../hooks/useQueryParamsUpdater";
import TabBar from "../accountIdentity/tabBar";
import AccountTabStakingRewards from "./rewards";
import AccountTabStakingNominations from "./nominations";
import { getChainSettings } from "../../utils/chain";

export default function AccountTabStaking() {
  const { sub } = useQueryParams();
  const updateQueryParams = useQueryParamsUpdater();
  const { modules } = getChainSettings();

  const tabs = useMemo(() => {
    let tabsList = [];
    if (modules?.staking?.rewards) {
      tabsList.push({
        icon: null,
        name: "rewards",
        children: <AccountTabStakingRewards />,
      });
    }
    if (modules?.staking?.nominations) {
      tabsList.push({
        icon: null,
        name: "nominations",
        children: <AccountTabStakingNominations />,
      });
    }
    return tabsList;
  }, [modules]);

  const selectedTab = useMemo(() => sub || tabs[0].name, [sub, tabs]);

  const content = useMemo(() => {
    return tabs.find((tab) => tab.name === selectedTab)?.children;
  }, [selectedTab, tabs]);

  const setSelectedTab = useCallback(
    (tab) => {
      updateQueryParams("sub", tab);
    },
    [updateQueryParams],
  );

  return (
    <Panel>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {content}
    </Panel>
  );
}
