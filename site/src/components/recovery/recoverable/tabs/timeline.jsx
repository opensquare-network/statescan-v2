import { useRecoverableTimelineData } from "../../../../hooks/recovery/useRecoverableTimelineData";
import { Panel } from "../../../styled/panel";
import Timeline from "../../../timeline";
import RecoveryTimelineFields from "../../timelineFields";
import RecoveryTimleineIcon from "../../timelineIcon";

export default function RecoverableTimelineTab() {
  const { data, loading } = useRecoverableTimelineData();

  return (
    <Panel>
      <Timeline
        timeline={data?.items || []}
        loading={loading}
        IconComponent={RecoveryTimleineIcon}
        FieldsComponent={RecoveryTimelineFields}
      />
    </Panel>
  );
}
