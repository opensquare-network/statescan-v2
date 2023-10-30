import { useMultisigTimelineData } from "../../hooks/multisig/useMultisigTimelineData";
import { MULTISIG_NAME } from "../../utils/constants";
import AddressOrIdentity from "../address";
import ExtrinsicLink from "../extrinsic/link";
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
