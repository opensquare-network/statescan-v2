import { useRecoveryData } from "../../../../hooks/recovery/useRecoveryData";
import { useRecoveryTimelineData } from "../../../../hooks/recovery/useRecoveryTimelineData";
import AddressesApprovalList from "../../../detail/addressesApprovalList";
import Divider from "../../../styled/divider";
import { Panel } from "../../../styled/panel";
import Timeline from "../../../timeline";
import RecoveryTimelineFields from "../../timelineFields";
import RecoveryTimleineIcon from "../../timelineIcon";

export default function RecoveryTimelineTab() {
  const { data, loading } = useRecoveryTimelineData();
  const { data: recovery } = useRecoveryData();

  return (
    <Panel>
      {data && (
        <>
          <AddressesApprovalList
            addresses={recovery?.allFriends}
            approvals={recovery?.friends}
          />

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
