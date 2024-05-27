import { useRecoveryQuery } from "../../../../hooks/apollo";
import { GET_RECOVERY_TIMELINE } from "../../../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../../utils/constants";
import { useRecoveryParams } from "../../../../utils/hooks/recovery/useRecoveryParams";
import AddressOrIdentity from "../../../address";
import Divider from "../../../styled/divider";
import { Panel } from "../../../styled/panel";
import Timeline from "../../../timeline";
import TimelineItemFields from "../../../timeline/itemFields";
import RecoveryTimleineIcon from "../../timelineIcon";
import RecoveryVouchedList from "../vouchedList";

function Fields({ item }) {
  const { args = {} } = item || {};
  const { lostAccount } = args;

  const fields = [
    lostAccount && [
      "Who",
      <AddressOrIdentity
        key={lostAccount}
        address={lostAccount}
        ellipsis={false}
      />,
    ],
  ].filter(Boolean);

  return <TimelineItemFields fields={fields} />;
}

export default function RecoveryTimelineTab() {
  const { address, rescuer, height } = useRecoveryParams();
  const { data, loading } = useRecoveryQuery(GET_RECOVERY_TIMELINE, {
    variables: {
      created: height,
      lostAccount: address,
      rescuerAccount: rescuer,
      offset: 0,
      limit: LIST_DEFAULT_PAGE_SIZE,
    },
  });

  return (
    <Panel>
      <RecoveryVouchedList />

      <Divider />

      <Timeline
        timeline={data?.recoveryTimeline?.items || []}
        loading={loading}
        IconComponent={RecoveryTimleineIcon}
        FieldsComponent={Fields}
      />
    </Panel>
  );
}
