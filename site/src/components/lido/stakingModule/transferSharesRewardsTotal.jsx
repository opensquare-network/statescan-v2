import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import { toLidoAmount } from "../../../utils/viewFuncs/lido";

export default function LidoTransferSharesRewardsTotal({ value }) {
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
