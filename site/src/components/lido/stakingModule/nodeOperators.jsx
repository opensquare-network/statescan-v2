import EvmAddress from "../evmAddress";
import EvmPagination from "../evmPagination";
import { ColoredInterLink } from "../../styled/link";
import { StatusNegativeTag, StatusPositiveTag } from "../../tag";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";
import { useLidoNodeOperatorsData } from "../../../hooks/lido/useLidoNodeOperatorsData";
import { toLidoBlockNumber } from "../../../utils/viewFuncs/lido";

const nodeOperatorsHead = [
  { name: "Node Operator", width: 220 },
  { name: "Reward Address", width: 220 },
  { name: "Vetted Signing Keys", align: "right", width: 180 },
  { name: "Status", align: "right", width: 120 },
];

function renderBooleanTag(value, positiveText, negativeText) {
  const TagComponent = value ? StatusPositiveTag : StatusNegativeTag;

  return <TagComponent>{value ? positiveText : negativeText}</TagComponent>;
}

function toOptionalNumber(value) {
  return value == null ? "--" : toLidoBlockNumber(value);
}

function toNodeOperatorsTableData(items = []) {
  return items.map((item) => [
    <ColoredInterLink
      key={`${item.id}-operator`}
      to={`/staking-modules/${item.stakingModuleId}/node-operators/${item.nodeOperatorId}`}
    >
      #{item.nodeOperatorId}
      {item.name ? ` ${item.name}` : ""}
    </ColoredInterLink>,
    <EvmAddress
      key={`${item.id}-reward`}
      address={item.rewardAddress}
      copy={false}
      maxWidth="170px"
    />,
    toOptionalNumber(item.vettedSigningKeysCount),
    renderBooleanTag(item.active, "Active", "Inactive"),
  ]);
}

export default function LidoStakingModuleNodeOperators({ stakingModuleId }) {
  const { data, loading } = useLidoNodeOperatorsData(stakingModuleId);
  const tableData = toNodeOperatorsTableData(data?.items);

  return (
    <StyledPanelTableWrapper
      footer={<EvmPagination nextCursor={data?.nextCursor} />}
    >
      <Table heads={nodeOperatorsHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
