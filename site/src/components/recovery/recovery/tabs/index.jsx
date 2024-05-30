import React from "react";
import DetailTabs from "../../../detail/tabs";
import RecoveryTimelineTab from "./timeline";
import RecoveryCallsTab from "./calls";
import { useRecoveryCallsData } from "../../../../hooks/recovery/useRecoveryCallsData";

export default function RecoveryDetailTabs() {
  const { data } = useRecoveryCallsData();

  const tabs = [
    {
      name: "Timeline",
      children: <RecoveryTimelineTab />,
    },
    {
      name: "Calls",
      count: data?.total,
      children: <RecoveryCallsTab />,
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
