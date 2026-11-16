import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import LoadableContent from "../../loadings/loadableContent";
import { useLidoStEthBalanceData } from "../../../hooks/lido/useLidoAddressProfileData";
import { toLidoAmount } from "../../../utils/viewFuncs/lido";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";

export default function LidoStakingModuleStEthBalance({ moduleAddress }) {
  const { decimals } = useChainSettings();
  const { data, loading } = useLidoStEthBalanceData(moduleAddress);

  if (isNil(data)) {
    return <LoadableContent loading={loading}>--</LoadableContent>;
  }

  return (
    <LoadableContent loading={loading}>
      <ValueDisplay
        value={toLidoAmount(data, decimals)}
        symbol="stETH"
        showNotEqualTooltip
      />
    </LoadableContent>
  );
}
