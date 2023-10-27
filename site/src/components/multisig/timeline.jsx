import { useMultisigTimelineData } from "../../hooks/multisig/useMultisigTimelineData";
import Timeline from "../timeline";

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
  const icons = {
    NewMultisig: "/imgs/icons/timeline-new-multisig.svg",
    MultisigApproval: "/imgs/icons/timeline-multisig-approval.svg",
    MultisigExecuted: "/imgs/icons/timeline-multisig-executed.svg",
    MultisigCancelled: "/imgs/icons/timeline-multisig-cancelled.svg",
  };

  return (
    <img
      src={icons[name]}
      alt={name}
      style={{
        width: 24,
        height: 24,
      }}
    />
  );
}

function Fields({ item }) {
  return <div>fields</div>;
}
