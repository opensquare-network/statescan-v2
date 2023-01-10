// ant.design tabs component

import { useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTabFromQuery } from "../../utils/viewFuncs";
import { Flex } from "../styled/flex";
import Tab from "../tab";

export default function DetailTabs({ tabs = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    getTabFromQuery(location, tabs[0].name),
  );

  return (
    <>
      <Flex>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            text={tab.name}
            count={tab.count}
            active={activeTab === tab.name}
            onClick={() => {
              navigate({ search: `?tab=${tab.name}&page=1` });
              setActiveTab(tab.name);
            }}
          />
        ))}
      </Flex>

      {tabs.map(
        (tab) =>
          activeTab === tab.name && (
            <Fragment key={tab.name}>{tab.children}</Fragment>
          ),
      )}
    </>
  );
}
