import { useProxyCountsData } from "../../../hooks/proxy/useProxyCountsData";
import DetailTabs from "../../detail/tabs";
import ProxyTimelineTab from "./timeline";

export default function ProxyDetailTabs({ delegatee, delegator, proxyId }) {
  const { data } = useProxyCountsData({
    proxyId,
    delegatee,
    delegator,
  });

  const tabs = [
    {
      name: "Timeline",
      children: <ProxyTimelineTab />,
    },
    {
      name: "Announcements",
      count: data.announcements,
      children: "Announcements",
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
