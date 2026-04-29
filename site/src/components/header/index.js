import { getChainSettings } from "../../utils/chain";
import DefaultHeader from "./defaultHeader";
import LidoHeader from "./lidoHeader";

const headerComponents = {
  lido: LidoHeader,
};

export default function Header() {
  const chainSettings = getChainSettings();
  const HeaderComponent = headerComponents[chainSettings.value] || DefaultHeader;

  return <HeaderComponent />;
}
