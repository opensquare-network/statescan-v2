import styled from "styled-components";
import BreadCrumb from "../../components/breadCrumb";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmAddress from "../../components/lido/evmAddress";
import EvmPagination from "../../components/lido/evmPagination";
import LidoStakingModuleStatus from "../../components/lido/stakingModule/status";
import { sortTimelineEvents } from "../../components/lido/stakingVault/utils";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import { ColoredInterLink } from "../../components/styled/link";
import Table from "../../components/table";
import { useLidoStakingModulesFilter } from "../../hooks/filter/useLidoStakingModulesFilter";
import { useLidoStakingModulesData } from "../../hooks/lido/useLidoStakingModulesData";
import { Inter_14_500 } from "../../styles/text";
import { toLidoTimestamp } from "../../utils/viewFuncs/lido";

const lidoStakingModulesHead = [
  { name: "Module", width: 240 },
  { name: "Module Address", width: 220 },
  { name: "Status", width: 170 },
  { name: "Updated Time", type: "time", width: 180 },
];

const ModuleInfo = styled.div`
  ${Inter_14_500};
  color: var(--fontPrimary);
`;

function toLidoStakingModulesTableData(items = []) {
  return items.map((item) => {
    const latestTimeline = sortTimelineEvents(item.timelines).at(-1);

    return [
      <ModuleInfo key={`${item.id}-module`}>
        <ColoredInterLink to={`/staking-modules/${item.id}`}>
          #{item.stakingModuleId} {item.name || "--"}
        </ColoredInterLink>
      </ModuleInfo>,
      <EvmAddress
        key={`${item.id}-module-address`}
        address={item.moduleAddress}
        copy={false}
        maxWidth="170px"
      />,
      <LidoStakingModuleStatus
        key={`${item.id}-status`}
        status={item.status}
      />,
      toLidoTimestamp(latestTimeline?.blockTime),
    ];
  });
}

export default function LidoStakingModules() {
  const filter = useLidoStakingModulesFilter();
  const { data, loading } = useLidoStakingModulesData();
  const tableData = toLidoStakingModulesTableData(data?.items);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Staking Modules" }]} />

      <Filter data={filter} />

      <StyledPanelTableWrapper
        footer={<EvmPagination nextCursor={data?.nextCursor} />}
      >
        <Table
          heads={lidoStakingModulesHead}
          data={tableData}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
