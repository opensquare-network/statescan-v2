import { ReactComponent as Dancebox } from "../../../components/icons/dancebox.svg";
import { governanceModules, treasuryModules } from "./modules";
import { danceboxColor } from "./common";

const dancebox = {
  name: "Dancebox",
  icon: <Dancebox />,
  identity: "dancebox",
  sub: "dancebox",
  value: "dancebox",
  chain: "dancebox",
  symbol: "DANCE",
  decimals: 12,
  chainIcon: "tanssi",
  ...danceboxColor,
  buttonColor: "#FFC32A",
  logo: "logo-img-2",
  modules: {
    identity: false,
    multisig: false,
  },

  nodes: [
    {
      name: "OpsLayer",
      url: "wss://fraa-dancebox-rpc.a.dancebox.tanssi.network",
    },
  ],
  useOnChainBlockData: true,
};

export default dancebox;
