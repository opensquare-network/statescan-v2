import { getChainSettings } from "../../utils/chain";
import light from "./light";

const chainSetting = getChainSettings();

const dark = {
  ...light,
  fontPrimary: "#FFFFFF",
  fontPrimaryInverse: "#fff",
  fontSecondary: "rgba(255, 255, 255, 0.55)",
  fontTertiary: "rgba(255, 255, 255, 0.25)",
  fontQuaternary: "rgba(255, 255, 255, 0.1)",
  fontPositive: "rgba(82, 204, 138, 1)",
  fontPending: "rgba(255, 187, 55, 1)",
  fontNegative: "rgba(238, 68, 68, 1)",
  strokeBase: "#252B37",
  strokeBox: "#4B505A",
  strokeBoxSelected: "#81848C",
  fillPanel: "#222732",
  fillPopup: "#292D38",
  fillPopupHover: "#2D323C",
  fillSub: "#2D323D",
  fillBase: "#1B202C",
  fillButton: "#1B202C",
  fillTooltip: "rgba(0, 0, 0, 0.85);",
  fillPanelBlanket: "rgba(34, 39, 50, 0.8)",
  fillAlpha: "rgba(255, 255, 255, 0.05)",
  fillBeta: "rgba(255, 255, 255, 0.02)",
  fillGamma: "rgba(255, 255, 255, 0)",
  fillActiveBlue: "#3765dc",
  fillPositive: "#52CC8A",
  fillNegative: "#ee4444",
  fillPending: "#FFBB37",
  theme500: chainSetting.color,
  theme100: chainSetting.colorSecondary,
};

export default dark;
