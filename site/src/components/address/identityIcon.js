import { ReactComponent as AuthIcon } from "../icons/identity/auth.svg";
import { ReactComponent as SubIcon } from "../icons/identity/sub.svg";
import { ReactComponent as ErrorIcon } from "../icons/identity/error.svg";
import { ReactComponent as UnauthorizedIcon } from "../icons/identity/error-grey.svg";
import { ReactComponent as SubGreyIcon } from "../icons/identity/sub-grey.svg";
import { ReactComponent as SubRedIcon } from "../icons/identity/sub-red.svg";

export default function IdentityIcon({ size = 12, status }) {
  const statusIconMap = new Map([
    ["NOT_VERIFIED", UnauthorizedIcon],
    ["VERIFIED", AuthIcon],
    ["ERRONEOUS", ErrorIcon],
    ["VERIFIED_LINKED", SubIcon],
    ["LINKED", SubGreyIcon],
    ["ERRONEOUS_LINKED", SubRedIcon],
  ]);

  const StatusIcon = statusIconMap.get(status) ?? ErrorIcon;

  return <StatusIcon width={size} height={size} />;
}
