import ValueDisplay from "../displayValue";
import { TextSecondary } from "../styled/text";
import Tooltip from "../tooltip";
import { toLidoAmount } from "../../utils/viewFuncs/lido";

export default function LidoValue({ value, decimals, symbol }) {
  const displayValue = toLidoAmount(value, decimals);

  return (
    <Tooltip tip={`${displayValue} ${symbol}`}>
      <TextSecondary>
        <ValueDisplay
          value={displayValue}
          symbol={symbol}
          abbreviate={false}
        />
      </TextSecondary>
    </Tooltip>
  );
}
