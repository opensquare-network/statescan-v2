// ant.design tabs component

import { useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { no_scroll_bar } from "../../styles";
import { getTabFromQuery } from "../../utils/viewFuncs";
import { Flex } from "../styled/flex";
import Tab from "../tab";

const TabsFlex = styled(Flex)`
  max-width: 100%;
  overflow: scroll;
  ${no_scroll_bar};
`;

export default function DetailTabs({ tabs = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const getTabValue = (tab) => tab.value || tab.name;

  const [activeTab, setActiveTab] = useState(
    getTabFromQuery(location, getTabValue(tabs[0])),
  );

  return (
    <>
      <TabsFlex>
        {tabs.map((tab) => (
          <Tab
            key={getTabValue(tab)}
            text={tab.name}
            count={tab.count}
            active={activeTab === getTabValue(tab)}
            onClick={() => {
              const value = getTabValue(tab);

              navigate({ search: `?tab=${value}&page=1` });
              setActiveTab(value);
            }}
          />
        ))}
      </TabsFlex>

      {tabs.map(
        (tab) =>
          activeTab === getTabValue(tab) && (
            <Fragment key={getTabValue(tab)}>{tab.children}</Fragment>
          ),
      )}
    </>
  );
}
