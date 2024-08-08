import DetailTabs from "../../../../detail/tabs";
import ProxyAnnouncementTimelineTab from "./timeline";

export default function ProxyAnnouncementTabs({ announcementId }) {
  const tabs = [
    {
      name: "Timeline",
      children: (
        <ProxyAnnouncementTimelineTab announcementId={announcementId} />
      ),
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
