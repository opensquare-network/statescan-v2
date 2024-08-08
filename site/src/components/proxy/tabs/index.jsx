import { useProxyCountsData } from "../../../hooks/proxy/useProxyCountsData";
import DetailTabs from "../../detail/tabs";
import ProxyAnnouncementsTab from "./announcements";
import ProxyCallsTab from "./calls";
import ProxyTimelineTab from "./timeline";

export default function ProxyDetailTabs({ delegatee, delegator, proxyId }) {
  const { data } = useProxyCountsData(proxyId, {
    delegatee,
    delegator,
  });

  const tabs = [
    {
      name: "Timeline",
      children: <ProxyTimelineTab />,
    },
    {
      name: "Calls",
      count: data.calls,
      children: <ProxyCallsTab />,
    },
    {
      name: "Announcements",
      count: data.announcements,
      children: (
        <ProxyAnnouncementsTab delegatee={delegatee} delegator={delegator} />
      ),
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
