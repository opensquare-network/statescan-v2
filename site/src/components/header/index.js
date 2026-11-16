import DefaultHeader from "./defaultHeader";
import LidoHeader from "./lidoHeader";
import { isLidoProtocol } from "../../utils/env";

export default function Header() {
  const HeaderComponent = isLidoProtocol() ? LidoHeader : DefaultHeader;

  return <HeaderComponent />;
}
