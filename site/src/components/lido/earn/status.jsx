import {
  StatusNegativeTag,
  StatusPositiveTag,
  Tag,
  TagThemed,
} from "../../tag";

const statusTagComponents = {
  active: StatusPositiveTag,
  canceled: StatusNegativeTag,
  cancelled: StatusNegativeTag,
  claimed: StatusPositiveTag,
  connected: StatusPositiveTag,
  deposited: StatusPositiveTag,
  disconnected: StatusNegativeTag,
  inactive: StatusNegativeTag,
  paused: StatusNegativeTag,
  pending: Tag,
};

export default function LidoEarnStatus({ status }) {
  if (!status) {
    return "--";
  }

  const normalizedStatus = status.toLowerCase();
  const TagComponent = statusTagComponents[normalizedStatus] || TagThemed;

  return <TagComponent>{status}</TagComponent>;
}
