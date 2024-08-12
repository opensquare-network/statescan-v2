export default function ProxyAnnouncementTimleineIcon({ name }) {
  const iconSrcMap = {
    Announced: "/imgs/icons/timeline-announcement_announced.svg",
    Killed: "/imgs/icons/timeline-announcement_killed.svg",
    Executed: "/imgs/icons/timeline-announcement_executed.svg",
    Rejected: "/imgs/icons/timeline-announcement_rejected.svg",
  };

  return <img width={24} height={24} src={iconSrcMap[name]} alt={name} />;
}
