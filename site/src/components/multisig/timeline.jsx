import { useMultisigTimelineData } from "../../hooks/multisig/useMultisigTimelineData";
import { MULTISIG_NAME } from "../../utils/constants";
import AddressOrIdentity from "../address";
import Timeline from "../timeline";
import TimelineItemFields from "../timeline/itemFields";

const iconsSrcs = {
  [MULTISIG_NAME.NewMultisig]: "/imgs/icons/timeline-new-multisig.svg",
  [MULTISIG_NAME.MultisigApproval]:
    "/imgs/icons/timeline-multisig-approval.svg",
  [MULTISIG_NAME.MultisigExecuted]:
    "/imgs/icons/timeline-multisig-executed.svg",
  [MULTISIG_NAME.MultisigCancelled]:
    "/imgs/icons/timeline-multisig-cancelled.svg",
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
  return (
    <img
      src={iconsSrcs[name]}
      alt={name}
      style={{
        width: 24,
        height: 24,
      }}
    />
  );
}

function Fields({ item }) {
  const fields = [
    item.name === MULTISIG_NAME.NewMultisig && [
      "Multisig Member",
      <AddressOrIdentity address={item.args.approving} />,
    ],
    item.name === MULTISIG_NAME.MultisigApproval && [
      "Multisig Member",
      <AddressOrIdentity address={item.args.approving} />,
    ],
    item.name === MULTISIG_NAME.MultisigExecuted && [
      "Multisig Member",
      <AddressOrIdentity address={item.args.approving} />,
    ],
    item.name === MULTISIG_NAME.MultisigCancelled && [
      "Multisig Member",
      <AddressOrIdentity address={item.args.cancelling} />,
    ],
  ].filter(Boolean);

  return <TimelineItemFields fields={fields} />;
}
