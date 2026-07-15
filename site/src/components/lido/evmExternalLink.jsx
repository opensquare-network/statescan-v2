import ExternalLinkWithCopy, {
  StyledExternalLink,
} from "../externalLinkWithCopy";
import Tooltip from "../tooltip";

export default function EvmExternalLink({
  href,
  children,
  className,
  copy = true,
  copyContent,
  tooltip = true,
  tooltipContent = children,
}) {
  const LinkComponent = copy ? ExternalLinkWithCopy : StyledExternalLink;

  if (!tooltip) {
    return (
      <LinkComponent
        className={className}
        href={href}
        copyContent={copyContent}
      >
        {children}
      </LinkComponent>
    );
  }

  if (copy) {
    return (
      <LinkComponent
        className={className}
        href={href}
        copyContent={copyContent}
      >
        <Tooltip tip={tooltipContent}>{children}</Tooltip>
      </LinkComponent>
    );
  }

  const link = (
    <LinkComponent className={className} href={href}>
      {children}
    </LinkComponent>
  );

  return <Tooltip tip={tooltipContent}>{link}</Tooltip>;
}
