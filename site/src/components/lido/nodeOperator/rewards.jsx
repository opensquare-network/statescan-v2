import { useCallback } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useQueryParamsUpdater from "../../../hooks/useQueryParamsUpdater";
import { useLidoOperatorFeeDistributedsData } from "../../../hooks/lido/useLidoOperatorFeeDistributedsData";
import TabBar from "../../accountIdentity/tabBar";
import { Panel } from "../../styled/panel";
import LidoOperatorFeeDistributedsTable from "../operatorFeeDistributeds/table";
import LidoNodeOperatorRewardClaims from "./operatorRewardClaims";

const TABS = {
  distributed: "distributed",
  claims: "claims",
};

const tabs = [{ name: TABS.distributed }, { name: TABS.claims }];

export default function LidoNodeOperatorRewards({ nodeOperatorId }) {
  const { sub } = useQueryParams({ parseNumbers: false });
  const updateQueryParams = useQueryParamsUpdater();
  const selectedTab = sub || TABS.distributed;
  const { data: distributedData, loading: distributedLoading } =
    useLidoOperatorFeeDistributedsData(nodeOperatorId);
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

      {selectedTab === TABS.distributed && (
        <LidoOperatorFeeDistributedsTable
          data={distributedData}
          loading={distributedLoading}
          bordered={false}
        />
      )}

      {selectedTab === TABS.claims && (
        <LidoNodeOperatorRewardClaims
          nodeOperatorId={nodeOperatorId}
          bordered={false}
        />
      )}
    </Panel>
  );
}
