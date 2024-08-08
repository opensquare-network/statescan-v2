import noop from "lodash.noop";
import { useProxyAnnouncementTimelineData } from "../../../../../hooks/proxy/useProxyAnnouncementTimelineData";
import { Panel } from "../../../../styled/panel";
import Timeline from "../../../../timeline";
import ProxyAnnouncementTimleineIcon from "./timelineIcon";

export default function ProxyAnnouncementTimelineTab({ announcementId }) {
  const { data, loading } = useProxyAnnouncementTimelineData(announcementId);

  return (
    <Panel>
      <Timeline
        timeline={data || []}
        loading={loading}
        IconComponent={ProxyAnnouncementTimleineIcon}
        FieldsComponent={noop}
      />
    </Panel>
  );
}
