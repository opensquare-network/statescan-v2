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
import { toLidoTimestamp } from "../../utils/viewFuncs/lido";

const lidoStakingModulesHead = [
  { name: "ID", width: 56 },
  { name: "Name", width: 220 },
  { name: "Module Address", width: 220 },
  { name: "Status", width: 170 },
  {
    name: { time: "Updated Time", age: "Last Updated" },
    type: "time",
    width: 200,
  },
];

function toLidoStakingModulesTableData(items = []) {
  return items.map((item) => {
    const latestTimeline = sortTimelineEvents(item.timelines).at(-1);
    const detailPath = `/staking/modules/${item.id}`;

    return [
      <ColoredInterLink key={`${item.id}-id`} to={detailPath}>
        #{item.stakingModuleId}
      </ColoredInterLink>,
      item.name ? (
        <ColoredInterLink key={`${item.id}-name`} to={detailPath}>
          {item.name}
        </ColoredInterLink>
      ) : (
        "--"
      ),
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
