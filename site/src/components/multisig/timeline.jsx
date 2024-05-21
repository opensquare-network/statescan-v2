import { useMultisigTimelineData } from "../../hooks/multisig/useMultisigTimelineData";
import { MULTISIG_NAME } from "../../utils/constants";
import AddressOrIdentity from "../address";
import Timeline from "../timeline";
import TimelineItemFields from "../timeline/itemFields";
import { ReactComponent as IconTimelineNewMultisig } from "../icons/timeline-new-multisig.svg";
import { ReactComponent as IconTimelineMultisigApproval } from "../icons/timeline-multisig-approval.svg";
import { ReactComponent as IconTimelineMultisigExecuted } from "../icons/timeline-multisig-executed.svg";
import { ReactComponent as IconTimelineMultisigCancelled } from "../icons/timeline-multisig-cancelled.svg";
import { ReactComponent as IconTimelineMultisigAsMultiThreshold1 } from "../icons/timeline-as-multi-threshold1.svg";
import { withCopy } from "../../HOC/withCopy";
import styled from "styled-components";
import { stringUpperFirst } from "@polkadot/util";

const CallHashWithCopy = withCopy(styled.span`
  word-break: break-all;
`);

const iconsMap = {
  [MULTISIG_NAME.NewMultisig]: IconTimelineNewMultisig,
  [MULTISIG_NAME.MultisigApproval]: IconTimelineMultisigApproval,
  [MULTISIG_NAME.MultisigExecuted]: IconTimelineMultisigExecuted,
  [MULTISIG_NAME.MultisigCancelled]: IconTimelineMultisigCancelled,
  [MULTISIG_NAME.asMultiThreshold1]: IconTimelineMultisigAsMultiThreshold1,
};

function Icon({ name }) {
  const IconComp = iconsMap[name];
  return IconComp && <IconComp width={24} height={24} />;
}

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

function Fields({ item }) {
  const signatoryAddressMap = {
    [MULTISIG_NAME.NewMultisig]: item.args.approving,
    [MULTISIG_NAME.MultisigApproval]: item.args.approving,
    [MULTISIG_NAME.MultisigExecuted]: item.args.approving,
    [MULTISIG_NAME.MultisigCancelled]: item.args.cancelling,
    [MULTISIG_NAME.asMultiThreshold1]: item.args.approving,
  };

  const fields = [
    [
      "Signatory",
      <AddressOrIdentity address={signatoryAddressMap[item.name]} />,
    ],
    item.name === MULTISIG_NAME.NewMultisig && [
      "Call Hash",
      <CallHashWithCopy>{item.args?.callHash}</CallHashWithCopy>,
    ],
    (item.name === MULTISIG_NAME.MultisigExecuted ||
      item.name === MULTISIG_NAME.asMultiThreshold1) && [
      "Result",
      stringUpperFirst(item.args?.result?.isOk?.toString?.()),
    ],
  ].filter(Boolean);

  return <TimelineItemFields fields={fields} />;
}
