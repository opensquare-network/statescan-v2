import { useRecoveryQuery } from "../../../../hooks/apollo";
import { GET_RECOVERABLE_TIMELINE } from "../../../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../../utils/constants";
import { useRecoverableParams } from "../../../../utils/hooks/recovery/useRecoverableParams";
import { Panel } from "../../../styled/panel";
import Timeline from "../../../timeline";
import RecoveryTimelineFields from "../../timelineFields";
import RecoveryTimleineIcon from "../../timelineIcon";

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
        FieldsComponent={RecoveryTimelineFields}
      />
    </Panel>
  );
}
