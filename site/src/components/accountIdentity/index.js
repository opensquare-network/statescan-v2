import styled from "styled-components";
import TabBar from "./tabBar";
import { useCallback } from "react";
import { ReactComponent as IdentityIcon } from "./identity.svg";
import { ReactComponent as SubIdentityIcon } from "./sub-identity.svg";
import { ReactComponent as InfoIcon } from "./info.svg";
import { ReactComponent as RegistrarIcon } from "./registrar.svg";
import useRegistrarTimeline from "./registrarTimeline";
import useIdentityTimeline from "./identityTimeline";
import useQueryParamsUpdater from "../../hooks/useQueryParamsUpdater";
import { useQueryParams } from "../../hooks/useQueryParams";
import { ACCOUNT_IDENTITY_TAB_SUBTAB } from "../../utils/constants";
import { gql } from "@apollo/client";
import AccountIdentityInfo from "./info";
import AccountSubIdentities from "./subIdentities";
import { useIdentityQuery } from "../../hooks/apollo";

const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid var(--strokeBase);
  background: var(--fillPanel);
  box-shadow: 0px 0.5px 1px 0px rgba(27, 32, 44, 0.02),
    0px 2px 4px 0px rgba(27, 32, 44, 0.03),
    0px 6px 16px 0px rgba(27, 32, 44, 0.05);
`;

const GET_IDENTITY_INFO = gql`
  query GetIdentityInfo($account: String!) {
    identity(account: $account) {
      display
      info {
        additional
        display
        email
        image
        legal
        web
        twitter
        riot
        pgpFingerprint
      }
      isSub
    }
  }
`;

export default function useAccountIdentity(account) {
  const queryParams = useQueryParams();
  const updateQueryParam = useQueryParamsUpdater();

  const { data, loading } = useIdentityQuery(GET_IDENTITY_INFO, {
    variables: {
      account,
    },
  });
  const isSub = data?.identity?.isSub;

  const identityInfo = (
    <AccountIdentityInfo
      display={data?.identity?.display}
      info={data?.identity?.info}
    />
  );

  const subIdentities = !isSub && <AccountSubIdentities account={account} />;

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

  const tabs = [
    {
      icon: <InfoIcon width={20} height={20} />,
      name: ACCOUNT_IDENTITY_TAB_SUBTAB.INFO,
    },
  ];

  if (!isSub) {
    tabs.push({
      icon: <SubIdentityIcon width={20} height={20} />,
      name: ACCOUNT_IDENTITY_TAB_SUBTAB.SUB_IDENTITIES,
    });
  }

  if (hasIdentityTimeline) {
    tabs.push({
      icon: isSub ? (
        <SubIdentityIcon width={20} height={20} />
      ) : (
        <IdentityIcon width={20} height={20} />
      ),
      name: ACCOUNT_IDENTITY_TAB_SUBTAB.IDENTITY_TIMELINE,
    });
  }

  if (hasRegistrarTimeline) {
    tabs.push({
      icon: <RegistrarIcon width={20} height={20} />,
      name: ACCOUNT_IDENTITY_TAB_SUBTAB.REGISTRAR_TIMELINE,
    });
  }

  let selectedTab = queryParams.sub;
  if (!selectedTab) {
    selectedTab = ACCOUNT_IDENTITY_TAB_SUBTAB.INFO;
  }

  const setSelectedTab = useCallback(
    (tab) => {
      updateQueryParam("sub", tab);
    },
    [updateQueryParam],
  );

  let timeline = null;
  if (selectedTab === ACCOUNT_IDENTITY_TAB_SUBTAB.INFO) {
    timeline = identityInfo;
  } else if (selectedTab === ACCOUNT_IDENTITY_TAB_SUBTAB.SUB_IDENTITIES) {
    timeline = subIdentities;
  } else if (selectedTab === ACCOUNT_IDENTITY_TAB_SUBTAB.IDENTITY_TIMELINE) {
    timeline = identityTimeline;
  } else if (selectedTab === ACCOUNT_IDENTITY_TAB_SUBTAB.REGISTRAR_TIMELINE) {
    timeline = registrarTimeline;
  }

  const component = (
    <Wrapper>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {timeline}
    </Wrapper>
  );

  return {
    loading: loading || isIdentityTimelineLoading || isRegistrarTimelineLoading,
    hasIdentity: hasIdentityTimeline || hasRegistrarTimeline,
    component,
  };
}
