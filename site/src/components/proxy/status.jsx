import capitalize from "lodash.capitalize";
import { PROXY_STATUS } from "../../utils/constants";

export default function ProxyStatus({ isRemoved }) {
  return (
    <div
      style={{
        color: isRemoved ? "var(--fillNegative)" : "var(--fillPositive)",
      }}
    >
      {isRemoved
        ? capitalize(PROXY_STATUS.REMOVED)
        : capitalize(PROXY_STATUS.ACTIVE)}
    </div>
  );
}
