import { useRecoveryTimelineData } from "../../../../hooks/recovery/useRecoveryTimelineData";
import Divider from "../../../styled/divider";
import { Panel } from "../../../styled/panel";
import Timeline from "../../../timeline";
import RecoveryTimelineFields from "../../timelineFields";
import RecoveryTimleineIcon from "../../timelineIcon";
import RecoveryVouchedList from "../vouchedList";

export default function RecoveryTimelineTab() {
  const { data, loading } = useRecoveryTimelineData();

  return (
    <Panel>
      {data && (
        <>
          <RecoveryVouchedList />

          <Divider />
        </>
      )}

      <Timeline
        timeline={data?.items || []}
        loading={loading}
        IconComponent={RecoveryTimleineIcon}
        FieldsComponent={RecoveryTimelineFields}
      />
    </Panel>
  );
}
