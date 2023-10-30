import { useMultisigTimelineData } from "../../hooks/multisig/useMultisigTimelineData";
import { MULTISIG_NAME } from "../../utils/constants";
import AddressOrIdentity from "../address";
import ExtrinsicLink from "../extrinsic/link";
import Timeline from "../timeline";
import TimelineItemFields from "../timeline/itemFields";
import { ReactComponent as IconTimelineNewMultisig } from "../icons/timeline-new-multisig.svg";
import { ReactComponent as IconTimelineMultisigApproval } from "../icons/timeline-multisig-approval.svg";
import { ReactComponent as IconTimelineMultisigExecuted } from "../icons/timeline-multisig-executed.svg";
import { ReactComponent as IconTimelineMultisigCancelled } from "../icons/timeline-multisig-cancelled.svg";

const iconsMap = {
  [MULTISIG_NAME.NewMultisig]: IconTimelineNewMultisig,
  [MULTISIG_NAME.MultisigApproval]: IconTimelineMultisigApproval,
  [MULTISIG_NAME.MultisigExecuted]: IconTimelineMultisigExecuted,
  [MULTISIG_NAME.MultisigCancelled]: IconTimelineMultisigCancelled,
};

export default function MultisigTimeline() {
  const { data: { multisigTimeline } = {}, loading } =
    useMultisigTimelineData();

  return (
    <Timeline
      timeline={multisigTimeline}
      loading={loading}
      IconComponent={Icon}
      FieldsComponent={Fields}
    />
  );
}

function Icon({ name }) {
  const IconComp = iconsMap[name];
  return <IconComp width={24} height={24} />;
}

function Fields({ item }) {
  const memberAddressMap = {
    [MULTISIG_NAME.NewMultisig]: item.args.approving,
    [MULTISIG_NAME.MultisigApproval]: item.args.approving,
    [MULTISIG_NAME.MultisigExecuted]: item.args.approving,
    [MULTISIG_NAME.MultisigCancelled]: item.args.cancelling,
  };

  const fields = [
    [
      "Multisig Member",
      <AddressOrIdentity address={memberAddressMap[item.name]} />,
    ],
    ["Extrinsic ID", <ExtrinsicLink indexer={item.indexer} />],
  ].filter(Boolean);

  return <TimelineItemFields fields={fields} />;
}
