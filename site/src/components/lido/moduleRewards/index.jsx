import { useCallback } from "react";
import styled from "styled-components";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useQueryParamsUpdater from "../../../hooks/useQueryParamsUpdater";
import TabBar from "../../accountIdentity/tabBar";
import { Panel } from "../../styled/panel";
import { useLidoModuleRewardsData } from "../../../hooks/lido/useLidoModuleRewardsData";
import { useLidoOperatorFeeDistributedsData } from "../../../hooks/lido/useLidoOperatorFeeDistributedsData";
import LidoOperatorFeeDistributedsTable from "../operatorFeeDistributeds/table";
import LidoModuleRewardsTable from "./table";

const TABS = {
  received: "received",
  distributed: "distributed",
};

const tabs = [{ name: TABS.received }, { name: TABS.distributed }];

const Wrapper = styled(Panel)`
  margin-top: 24px;
`;

export default function LidoModuleRewards({ stakingModuleId }) {
  const { sub } = useQueryParams({ parseNumbers: false });
  const updateQueryParams = useQueryParamsUpdater();
  const selectedTab = sub || TABS.received;
  const { data: receivedData, loading: receivedLoading } =
    useLidoModuleRewardsData(stakingModuleId);
  const { data: distributedData, loading: distributedLoading } =
    useLidoOperatorFeeDistributedsData();
  const setSelectedTab = useCallback(
    (tab) => {
      updateQueryParams("sub", tab);
    },
    [updateQueryParams],
  );

  return (
    <Wrapper>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {selectedTab === TABS.received && (
        <LidoModuleRewardsTable
          data={receivedData}
          loading={receivedLoading}
          showModuleId={false}
          bordered={false}
        />
      )}

      {selectedTab === TABS.distributed && (
        <LidoOperatorFeeDistributedsTable
          data={distributedData}
          loading={distributedLoading}
          bordered={false}
        />
      )}
    </Wrapper>
  );
}
