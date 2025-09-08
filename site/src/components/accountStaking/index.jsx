import { Panel } from "../styled/panel";
import { useQueryParams } from "../../hooks/useQueryParams";
import useQueryParamsUpdater from "../../hooks/useQueryParamsUpdater";
import TabBar from "../accountIdentity/tabBar";
import { useCallback } from "react";
import AccountTabStakingRewards from "./rewards";

export default function AccountTabStaking() {
  const { sub } = useQueryParams();
  const updateQueryParams = useQueryParamsUpdater();

  const tabs = [
    {
      icon: null, // TODO: icon
      name: "rewards",
      children: <AccountTabStakingRewards />,
    },
  ];
  let selectedTab = sub;
  if (!selectedTab) {
    selectedTab = tabs[0].name;
  }

  const content = tabs.find((tab) => tab.name === selectedTab)?.children;

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
