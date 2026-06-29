import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import Pagination from "../../pagination";
import { ColoredInterLink } from "../../styled/link";
import { StatusNegativeTag, StatusPositiveTag } from "../../tag";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";
import HelpLabel from "../../tooltip/helpLabel";
import { useLidoNodeOperatorsData } from "../../../hooks/lido/useLidoNodeOperatorsData";
import { isCsmModule } from "./utils";
import { toLidoAmount, toLidoBlockNumber } from "../../../utils/viewFuncs/lido";

const norNodeOperatorsHead = [
  { name: "ID", width: 72 },
  { name: "Name", width: 220 },
  { name: "Reward Address", width: 220 },
  { name: "Vetted Signing Keys", align: "right", width: 180 },
  {
    name: (
      <HelpLabel tip="Total rewards in shares." align="right" fullWidth>
        Total Rewards
      </HelpLabel>
    ),
    align: "right",
    width: 180,
  },
  { name: "Status", align: "right", width: 120 },
];

const csmNodeOperatorsHead = [
  { name: "ID", width: 72 },
  { name: "Manager Address", width: 220 },
  { name: "Reward Address", width: 220 },
  { name: "Vetted Signing Keys", align: "right", width: 180 },
];

function renderBooleanTag(value, positiveText, negativeText) {
  const TagComponent = value ? StatusPositiveTag : StatusNegativeTag;

  return <TagComponent>{value ? positiveText : negativeText}</TagComponent>;
}

function toOptionalNumber(value) {
  return isNil(value) ? "--" : toLidoBlockNumber(value);
}

function toSharesValue(value) {
  if (isNil(value)) {
    return "--";
  }

  return (
    <ValueDisplay
      value={toLidoAmount(value, 18)}
      symbol=""
      showNotEqualTooltip
    />
  );
}

function toNorNodeOperatorsTableData(items = []) {
  return items.map((item) => {
    const detailPath = `/staking/modules/${item.stakingModuleId}/node-operators/${item.nodeOperatorId}`;
    const rowKey = [item.stakingModuleId, item.nodeOperatorId].join("-");

    return [
      <ColoredInterLink key={`${rowKey}-operator`} to={detailPath}>
        #{item.nodeOperatorId}
      </ColoredInterLink>,
      item.name ? (
        <ColoredInterLink key={`${rowKey}-name`} to={detailPath}>
          {item.name}
        </ColoredInterLink>
      ) : (
        "--"
      ),
      <EvmAddress
        key={`${rowKey}-reward`}
        address={item.rewardAddress}
        copy={false}
        maxWidth="170px"
      />,
      toOptionalNumber(
        item.vettedSigningKeysCount ?? item.approvedValidatorsCount,
      ),
      toSharesValue(item.rewardsDistributedShares),
      renderBooleanTag(item.active, "Active", "Inactive"),
    ];
  });
}

function toCsmNodeOperatorsTableData(items = []) {
  return items.map((item) => {
    const detailPath = `/staking/modules/${item.stakingModuleId}/node-operators/${item.nodeOperatorId}`;
    const rowKey = [item.stakingModuleId, item.nodeOperatorId].join("-");

    return [
      <ColoredInterLink key={`${rowKey}-operator`} to={detailPath}>
        #{item.nodeOperatorId}
      </ColoredInterLink>,
      <EvmAddress
        key={`${rowKey}-manager`}
        address={item.managerAddress}
        copy={false}
        maxWidth="170px"
      />,
      <EvmAddress
        key={`${rowKey}-reward`}
        address={item.rewardAddress}
        copy={false}
        maxWidth="170px"
      />,
      toOptionalNumber(
        item.vettedSigningKeysCount ?? item.approvedValidatorsCount,
      ),
    ];
  });
}

export default function LidoStakingModuleNodeOperators({ stakingModule }) {
  const stakingModuleId = stakingModule?.stakingModuleId;
  const isCsm = isCsmModule(stakingModule);
  const { data, loading } = useLidoNodeOperatorsData(stakingModuleId);
  const heads = isCsm ? csmNodeOperatorsHead : norNodeOperatorsHead;
  const tableData = isCsm
    ? toCsmNodeOperatorsTableData(data?.items)
    : toNorNodeOperatorsTableData(data?.items);

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination page={1} pageSize={data?.limit} total={data?.total} />
      }
    >
      <Table heads={heads} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
