import BreadCrumb from "../../components/breadCrumb";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import EvmAddress from "../../components/lido/evmAddress";
import LidoStakingModuleStatus from "../../components/lido/stakingModule/status";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import { ColoredInterLink } from "../../components/styled/link";
import Table from "../../components/table";
import { useLidoStakingModulesFilter } from "../../hooks/filter/useLidoStakingModulesFilter";
import { useLidoStakingModulesData } from "../../hooks/lido/useLidoStakingModulesData";
import { useQueryParams } from "../../hooks/useQueryParams";
import { toLidoTimestamp } from "../../utils/viewFuncs/lido";

const lidoStakingModulesHead = [
  { name: "ID", width: 56 },
  { name: "Name", width: 220 },
  { name: "Module Address", width: 220 },
  {
    name: { time: "Updated Time", age: "Last Updated" },
    type: "time",
    width: 200,
  },
  { name: "Status", align: "right", width: 170 },
];

function toLidoStakingModulesTableData(items = []) {
  return items.map((item) => {
    const latestTimeline = item.timeline?.at(-1);
    const moduleId = item.stakingModuleId;
    const detailPath = `/staking/modules/${moduleId}`;

    return [
      <ColoredInterLink key={`${moduleId}-id`} to={detailPath}>
        #{moduleId}
      </ColoredInterLink>,
      <ColoredInterLink key={`${moduleId}-name`} to={detailPath}>
        {item.name}
      </ColoredInterLink>,
      <EvmAddress
        key={`${moduleId}-module-address`}
        address={item.stakingModule}
        copy={false}
        maxWidth="170px"
      />,
      toLidoTimestamp(latestTimeline?.indexer?.blockTimestamp),
      <LidoStakingModuleStatus
        key={`${moduleId}-status`}
        status={item.status}
      />,
    ];
  });
}

export function LidoStakingModulesTable({ data, loading }) {
  const { page = 1 } = useQueryParams();
  const tableData = toLidoStakingModulesTableData(data?.items);

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination
          page={parseInt(page)}
          pageSize={data?.limit}
          total={data?.total}
        />
      }
    >
      <Table
        heads={lidoStakingModulesHead}
        data={tableData}
        loading={loading}
      />
    </StyledPanelTableWrapper>
  );
}

export default function LidoStakingModules() {
  const filter = useLidoStakingModulesFilter();
  const { data, loading } = useLidoStakingModulesData();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Staking Modules" }]} />

      <Filter data={filter} />

      <LidoStakingModulesTable data={data} loading={loading} />
    </Layout>
  );
}
