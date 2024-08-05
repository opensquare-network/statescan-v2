export default function ProxyTimleineIcon({ name }) {
  const iconSrcMap = {
    ProxyExecuted: "",
    PureCreated: "/imgs/icons/timeline-proxy_pure_created.svg",
    Announced: "",
    ProxyAdded: "/imgs/icons/timeline-proxy_proxy_added.svg",
    ProxyRemoved: "/imgs/icons/timeline-proxy_proxy_removed.svg",
  };

  return <img width={24} height={24} src={iconSrcMap[name]} alt={name} />;
}
