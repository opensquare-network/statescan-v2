import ExternalLink from "../../externalLink";
import { Tertiary } from "../sections/governance/styled";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";

export default function OverviewItemValueWithAll({ active, all, link }) {
  const { subSquareWebsite } = useChainSettings();

  return (
    <span>
      {active || 0}{" "}
      <Tertiary>
        /{" "}
        <ExternalLink href={`${subSquareWebsite}/${link}`}>
          {all || 0}
        </ExternalLink>
      </Tertiary>
    </span>
  );
}
