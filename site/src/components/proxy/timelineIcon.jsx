export default function ProxyTimleineIcon({ name }) {
  const iconSrcMap = {
    ProxyExecuted: "/imgs/icons/timeline-proxy_proxy_executed.svg",
    PureCreated: "/imgs/icons/timeline-proxy_pure_created.svg",
    Announced: "/imgs/icons/timeline-annoucement_announced.svg",
    ProxyAdded: "/imgs/icons/timeline-proxy_proxy_added.svg",
    ProxyRemoved: "/imgs/icons/timeline-proxy_proxy_removed.svg",
  };

  return <img width={24} height={24} src={iconSrcMap[name]} alt={name} />;
}
