import { getChainSettingByEnv } from "../../utils/env";

const chainSetting = getChainSettingByEnv();

const light = {
  fontPrimary: "#000000",
  fontPrimaryInverse: "#fff",
  fontSecondary: "rgba(27, 32, 44, 0.6)",
  fontTertiary: "rgba(27, 32, 44, 0.3)",
  fontQuaternary: "rgba(27, 32, 44, 0.1)",
  strokeBase: "#F6F6F7",
  strokeBox: "#e1e2e4",
  strokeBoxSelected: "#CBCCCE",
  fillPanel: "#fff",
  fillPopup: "#fff",
  fillPopupHover: "#F8F8F9",
  fillSub: "#EFEFF0",
  fillSubDark: "#262B37",
  fillBase: "#F8F8F9",
  fillButton: "#000000",
  fillBub: "#EFEFF0",
  fillTooltip: "rgba(0, 0, 0, 0.85)",
  fillGradientIcon:
    "linear-gradient(135deg, rgba(27, 32, 44, 0.05) 0%, rgba(27, 32, 44, 0) 100%)",
  fillPanelBlanket: "rgba(255, 255, 255, 0.8)",
  shadowPanel:
    "0px 6px 16px rgba(27, 32, 44, 0.05), 0px 2px 4px rgba(27, 32, 44, 0.03), 0px 0.5px 1px rgba(27, 32, 44, 0.02)",
  fillAlpha: "rgba(27, 32, 44, 0.05)",
  fillBeta: "rgba(27, 32, 44, 0.02)",
  fillGamma: "rgba(27, 32, 44, 0)",
  theme500: chainSetting.color,
  theme100: chainSetting.colorSecondary,
};

export default light;
