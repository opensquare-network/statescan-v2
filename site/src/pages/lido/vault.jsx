import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import DetailTabs from "../../components/detail/tabs";
import DetailLayout from "../../components/layout/detailLayout";
import Loading from "../../components/loadings/loading";
import NoData from "../../components/noData";
import LidoStakingVaultDetailList from "../../components/lido/stakingVault/detailList";
import LidoStakingVaultTimeline from "../../components/lido/stakingVault/timeline";
import { Panel } from "../../components/styled/panel";
import { useLidoVaultData } from "../../hooks/lido/useLidoVaultData";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";

const TabPanel = styled(Panel)`
  padding: 24px;
`;

export default function LidoStakingVault() {
  const { data, loading, vaultId } = useLidoVaultData();
  const chainSettings = useChainSettings();
  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Staking Vaults", path: "/staking-vaults" },
        { name: vaultId },
      ]}
    />
  );

  if (loading) {
    return (
      <DetailLayout breadCrumb={breadCrumb}>
        <Panel>
          <Loading />
        </Panel>
      </DetailLayout>
    );
  }

  if (!data) {
    return (
      <DetailLayout breadCrumb={breadCrumb}>
        <Panel>
          <NoData />
        </Panel>
      </DetailLayout>
    );
  }

  const tabs = [
    {
      name: "Timeline",
      children: (
        <TabPanel>
          <LidoStakingVaultTimeline vault={data} />
        </TabPanel>
      ),
    },
  ];

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <LidoStakingVaultDetailList
          vault={data}
          chainSettings={chainSettings}
        />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
