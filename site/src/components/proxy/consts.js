import { PROXY_ANNOUNCEMENT_STATUS } from "../../utils/constants";

export const PROXY_ANNOUNCEMENT_STATUS_COLORS = {
  [PROXY_ANNOUNCEMENT_STATUS.ANNOUNCED]: "var(--fillActiveBlue)",
  [PROXY_ANNOUNCEMENT_STATUS.EXECUTED]: "var(--fillPositive)",
  [PROXY_ANNOUNCEMENT_STATUS.KILLED]: "var(--fillNegative)",
  [PROXY_ANNOUNCEMENT_STATUS.REJECTED]: "var(--fillNegative)",
  [PROXY_ANNOUNCEMENT_STATUS.REMOVED]: "var(--fillNegative)",
};
