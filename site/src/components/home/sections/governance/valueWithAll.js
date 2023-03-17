import ExternalLink from "../../../externalLink";
import { Tertiary } from "./styled";
import useChainSettings from "../../../../utils/hooks/chain/useChainSettings";

export default function ValueWithAll({ active, all, link }) {
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
