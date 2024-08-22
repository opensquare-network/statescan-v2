export default function ProxyTimleineIcon({ name }) {
  const iconSrcMap = {
    ProxyExecuted: "/imgs/icons/timeline-proxy_proxy_executed.svg",
    PureCreated: "/imgs/icons/timeline-proxy_pure_created.svg",
    ProxyAdded: "/imgs/icons/timeline-proxy_proxy_added.svg",
    ProxyRemoved: "/imgs/icons/timeline-proxy_proxy_removed.svg",
    Announced: "/imgs/icons/timeline-announcement_announced.svg",
    AnonymousCreated: "/imgs/icons/timeline-proxy_anonymous_created.svg",
    Killed: "/imgs/icons/timeline-proxy_killed.svg",
    addProxy: "/imgs/icons/timeline-proxy_add_proxy.svg",
    removeProxy: "/imgs/icons/timeline-proxy_proxy_removed.svg",
  };

  return <img width={24} height={24} src={iconSrcMap[name]} alt={name} />;
}
