import { getChainSettings } from "../../utils/chain";

const chainSetting = getChainSettings();

const dark = {
  fontPrimary: "#FFFFFF",
  fontPrimaryInverse: "#fff",
  fontSecondary: "rgba(255, 255, 255, 0.55)",
  fontTertiary: "rgba(255, 255, 255, 0.25)",
  fontQuaternary: "rgba(255, 255, 255, 0.1)",
  strokeBase: "#252B37",
  strokeBox: "#4B505A",
  strokeBoxSelected: "#81848C",
  fillPanel: "#222732",
  fillPopup: "#292D38",
  fillPopupHover: "#2D323C",
  fillSub: "#262B37",
  fillBase: "#1B202C",
  fillButton: "#1B202C",
  fillBub: "#2D323D",
  fillTooltip: "rgba(0, 0, 0, 0.85);",
  fillPanelBlanket: "rgba(34, 39, 50, 0.8)",
  shadowPanel:
    "0px 6px 16px rgba(27, 32, 44, 0.05), 0px 2px 4px rgba(27, 32, 44, 0.03), 0px 0.5px 1px rgba(27, 32, 44, 0.02)",
  fillAlpha: "rgba(255, 255, 255, 0.05)",
  fillBeta: "rgba(255, 255, 255, 0.02)",
  fillGamma: "rgba(255, 255, 255, 0)",
  fillActiveBlue: "#3765dc",
  fillPositive: "#52CC8A",
  fillNegative: "#ee4444",
  theme500: chainSetting.color,
  theme100: chainSetting.colorSecondary,
};

export default dark;
