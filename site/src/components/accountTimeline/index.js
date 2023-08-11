import styled from "styled-components";
import TabBar from "./tabBar";
import { useCallback } from "react";
import { ReactComponent as IdentityIcon } from "./identity.svg";
import { ReactComponent as RegistrarIcon } from "./registrar.svg";
import useRegistrarTimeline from "./registrarTimeline";
import useIdentityTimeline from "./identityTimeline";
import useQueryParamsUpdater from "../../hooks/useQueryParamsUpdater";
import { useQueryParams } from "../../hooks/useQueryParams";

const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid var(--strokeBase);
  background: var(--fillPanel);
  box-shadow: 0px 0.5px 1px 0px rgba(27, 32, 44, 0.02),
    0px 2px 4px 0px rgba(27, 32, 44, 0.03),
    0px 6px 16px 0px rgba(27, 32, 44, 0.05);
`;

const identityTab = "identity";
const registrarTab = "registrar";

export default function useAccountTimeline(account) {
  const queryParams = useQueryParams();
  const updateQueryParam = useQueryParamsUpdater();

  const {
    data: registrarTimelineData,
    loading: isRegistrarTimelineLoading,
    component: registrarTimeline,
  } = useRegistrarTimeline(account);
  const {
    data: identityTimelineData,
    loading: isIdentityTimelineLoading,
    component: identityTimeline,
  } = useIdentityTimeline(account);

  const hasIdentityTimeline = identityTimelineData?.length > 0;
  const hasRegistrarTimeline = registrarTimelineData?.length > 0;

  const tabs = [];

  if (hasIdentityTimeline) {
    tabs.push({
      icon: <IdentityIcon width={20} height={20} />,
      name: identityTab,
    });
  }

  if (hasRegistrarTimeline) {
    tabs.push({
      icon: <RegistrarIcon width={20} height={20} />,
      name: registrarTab,
    });
  }

  let selectedTab = queryParams.sub;
  if (!selectedTab) {
    if (hasIdentityTimeline) {
      selectedTab = identityTab;
    } else if (hasRegistrarTimeline) {
      selectedTab = registrarTab;
    }
  }

  const switchToTab = useCallback(
    (tab) => {
      updateQueryParam("sub", tab);
    },
    [updateQueryParam],
  );

  let timeline = null;
  if (selectedTab === identityTab) {
    timeline = identityTimeline;
  } else if (selectedTab === registrarTab) {
    timeline = registrarTimeline;
  }

  const component = (
    <Wrapper>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={switchToTab}
      />
      {timeline}
    </Wrapper>
  );

  return {
    loading: isIdentityTimelineLoading || isRegistrarTimelineLoading,
    hasTimeline: hasIdentityTimeline || hasRegistrarTimeline,
    component,
  };
}
