import { useRecoveryQuery } from "../../../../hooks/apollo";
import { GET_RECOVERABLE_TIMELINE } from "../../../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../../utils/constants";
import { useRecoverableParams } from "../../../../utils/hooks/recovery/useRecoverableParams";
import AddressOrIdentity from "../../../address";
import { Panel } from "../../../styled/panel";
import Timeline from "../../../timeline";
import TimelineItemFields from "../../../timeline/itemFields";

function Icons({ name }) {
  const iconSrcMap = {
    RecoveryCreated: "/imgs/icons/timeline-recovery_created.svg",
    RecoveryRemoved: "/imgs/icons/timeline-recovery_removed.svg",
    RecoveryInitiated: "/imgs/icons/timeline-recovery_initiated.svg",
    RecoveryVouched: "/imgs/icons/timeline-recovery_vouched.svg",
    RecoveryClosed: "/imgs/icons/timeline-recovery_closed.svg",
    AccountRecovered: "/imgs/icons/timeline-account_recovered.svg",
  };

  return <img width={24} height={24} src={iconSrcMap[name]} alt={name} />;
}

function Fields({ item }) {
  const { args = {} } = item || {};
  const { who } = args;

  const fields = [
    who && [
      "Who",
      <AddressOrIdentity key={who} address={who} ellipsis={false} />,
    ],
  ].filter(Boolean);

  return <TimelineItemFields fields={fields} />;
}

export default function RecoverableTimelineTab() {
  const { address, height } = useRecoverableParams();
  const { data, loading } = useRecoveryQuery(GET_RECOVERABLE_TIMELINE, {
    variables: {
      recoverableHeight: height,
      lostAccount: address,
      offset: 0,
      limit: LIST_DEFAULT_PAGE_SIZE,
    },
  });

  return (
    <Panel>
      <Timeline
        timeline={data?.recoverableTimeline?.items || []}
        loading={loading}
        IconComponent={Icons}
        FieldsComponent={Fields}
      />
    </Panel>
  );
}
