export default function ProxyAnnouncementTimleineIcon({ name }) {
  const iconSrcMap = {
    Announced: "/imgs/icons/timeline-annoucement_announced.svg",
    Killed: "/imgs/icons/timeline-proxy_killed.svg",
    Executed: "/imgs/icons/timeline-annoucement_executed.svg",
    Rejected: "/imgs/icons/timeline-annoucement_rejected.svg",
  };

  return <img width={24} height={24} src={iconSrcMap[name]} alt={name} />;
}
