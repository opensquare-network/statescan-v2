import isNil from "lodash.isnil";
import { StatusNegativeTag, StatusPositiveTag, TagThemed } from "../../tag";

const STAKING_MODULE_STATUS = {
  0: {
    label: "Active",
    Component: StatusPositiveTag,
  },
  1: {
    label: "Deposits Paused",
    Component: TagThemed,
  },
  2: {
    label: "Stopped",
    Component: StatusNegativeTag,
  },
};

export default function LidoStakingModuleStatus({ status }) {
  const data = STAKING_MODULE_STATUS[status];
  if (isNil(data)) {
    return "--";
  }

  const Status = data.Component;

  return <Status>{data.label}</Status>;
}
