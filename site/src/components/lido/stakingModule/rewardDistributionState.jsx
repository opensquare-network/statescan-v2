import isNil from "lodash.isnil";
import { StatusPositiveTag, Tag, TagThemed } from "../../tag";

export const CSM_REWARD_DISTRIBUTION_STATE = {
  TRANSFERRED_TO_MODULE: 0,
  READY_FOR_DISTRIBUTION: 1,
  DISTRIBUTED: 2,
};

const REWARD_DISTRIBUTION_STATE = {
  [CSM_REWARD_DISTRIBUTION_STATE.TRANSFERRED_TO_MODULE]: {
    label: "Transferred to Module",
    Component: Tag,
  },
  [CSM_REWARD_DISTRIBUTION_STATE.READY_FOR_DISTRIBUTION]: {
    label: "Ready for Distribution",
    Component: TagThemed,
  },
  [CSM_REWARD_DISTRIBUTION_STATE.DISTRIBUTED]: {
    label: "Distributed",
    Component: StatusPositiveTag,
  },
};

export default function LidoRewardDistributionState({ state }) {
  const data = REWARD_DISTRIBUTION_STATE[state];
  if (isNil(data)) {
    return "--";
  }

  const State = data.Component;

  return <State>{data.label}</State>;
}
