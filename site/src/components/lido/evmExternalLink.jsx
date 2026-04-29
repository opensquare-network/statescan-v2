import ExternalLinkWithCopy, {
  StyledExternalLink,
} from "../externalLinkWithCopy";
import Tooltip from "../tooltip";

export default function EvmExternalLink({
  href,
  children,
  copy = true,
  tooltip = true,
  tooltipContent = children,
}) {
  const LinkComponent = copy ? ExternalLinkWithCopy : StyledExternalLink;

  if (!tooltip) {
    return <LinkComponent href={href}>{children}</LinkComponent>;
  }

  if (copy) {
    return (
      <LinkComponent href={href}>
        <Tooltip tip={tooltipContent}>{children}</Tooltip>
      </LinkComponent>
    );
  }

  const link = <LinkComponent href={href}>{children}</LinkComponent>;

  return <Tooltip tip={tooltipContent}>{link}</Tooltip>;
}
