import { useCallback, useMemo } from "react";
import { Panel } from "../styled/panel";
import { useQueryParams } from "../../hooks/useQueryParams";
import useQueryParamsUpdater from "../../hooks/useQueryParamsUpdater";
import TabBar from "../accountIdentity/tabBar";
import AccountTabStakingRewards from "./rewards";
import AccountTabStakingNominations from "./nominations";

export default function AccountTabStaking() {
  const { sub } = useQueryParams();
  const updateQueryParams = useQueryParamsUpdater();

  const tabs = useMemo(
    () => [
      {
        icon: null, // TODO: icon
        name: "rewards",
        children: <AccountTabStakingRewards />,
      },
      {
        icon: null,
        name: "nominations",
        children: <AccountTabStakingNominations />,
      },
    ],
    [],
  );

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
