import ExternalLink from "../../externalLink";
import { Tertiary } from "../sections/governance/styled";
import Tooltip from "../../tooltip";

export default function OverviewItemValueWithAll({
  active,
  all,
  link,
  label = "",
}) {
  return (
    <span>
      {active || 0}{" "}
      <Tertiary>
        /{" "}
        <Tooltip tip={`Total ${label}`} style={{ display: "inline" }}>
          <ExternalLink href={link}>{all || 0}</ExternalLink>
        </Tooltip>
      </Tertiary>
    </span>
  );
}
