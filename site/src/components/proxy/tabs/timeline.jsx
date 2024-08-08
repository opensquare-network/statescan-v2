import { useParams } from "react-router-dom";
import { useProxyTimelineData } from "../../../hooks/proxy/useProxyTimelineData";
import Timeline from "../../timeline";
import { Panel } from "../../styled/panel";
import ProxyTimleineIcon from "../timelineIcon";
import ProxyTimelineFields from "../timelineFields";

export default function ProxyTimelineTab() {
  const { id } = useParams();
  const { data, loading } = useProxyTimelineData(id);

  return (
    <Panel>
      <Timeline
        timeline={data || []}
        loading={loading}
        IconComponent={ProxyTimleineIcon}
        FieldsComponent={ProxyTimelineFields}
      />
    </Panel>
  );
}
