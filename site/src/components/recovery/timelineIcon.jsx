export default function RecoveryTimleineIcon({ name }) {
  const iconSrcMap = {
    RecoveryCreated: "/imgs/icons/timeline-recovery_created.svg",
    RecoveryRemoved: "/imgs/icons/timeline-recovery_removed.svg",
    RecoveryInitiated: "/imgs/icons/timeline-recovery_initiated.svg",
    RecoveryVouched: "/imgs/icons/timeline-recovery_vouched.svg",
    RecoveryClosed: "/imgs/icons/timeline-recovery_closed.svg",
    AccountRecovered: "/imgs/icons/timeline-account_recovered.svg",
  };

  return <img width={24} height={24} src={iconSrcMap[name]} alt={name} />;
}
