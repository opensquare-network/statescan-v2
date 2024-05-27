import { useRecoveryQuery } from "../../../../hooks/apollo";
import { GET_RECOVERABLE_TIMELINE } from "../../../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../../utils/constants";
import { useRecoverableParams } from "../../../../utils/hooks/recovery/useRecoverableParams";
import AddressOrIdentity from "../../../address";
import { Panel } from "../../../styled/panel";
import Timeline from "../../../timeline";
import TimelineItemFields from "../../../timeline/itemFields";
import RecoveryTimleineIcon from "../../timelineIcon";

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
        IconComponent={RecoveryTimleineIcon}
        FieldsComponent={Fields}
      />
    </Panel>
  );
}
