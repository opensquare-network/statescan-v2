import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import EvmAddress from "../evmAddress";
import EvmPagination from "../evmPagination";
import { ColoredInterLink } from "../../styled/link";
import { StatusNegativeTag, StatusPositiveTag } from "../../tag";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";
import HelpLabel from "../../tooltip/helpLabel";
import { useLidoNodeOperatorsData } from "../../../hooks/lido/useLidoNodeOperatorsData";
import { toLidoAmount, toLidoBlockNumber } from "../../../utils/viewFuncs/lido";

const nodeOperatorsHead = [
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

function toNodeOperatorsTableData(items = []) {
  return items.map((item) => {
    const detailPath = `/staking-modules/${item.stakingModuleId}/node-operators/${item.nodeOperatorId}`;

    return [
      <ColoredInterLink key={`${item.id}-operator`} to={detailPath}>
        #{item.nodeOperatorId}
      </ColoredInterLink>,
      item.name ? (
        <ColoredInterLink key={`${item.id}-name`} to={detailPath}>
          {item.name}
        </ColoredInterLink>
      ) : (
        "--"
      ),
      <EvmAddress
        key={`${item.id}-reward`}
        address={item.rewardAddress}
        copy={false}
        maxWidth="170px"
      />,
      toOptionalNumber(item.vettedSigningKeysCount),
      toSharesValue(item.rewardsDistributedShares),
      renderBooleanTag(item.active, "Active", "Inactive"),
    ];
  });
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
