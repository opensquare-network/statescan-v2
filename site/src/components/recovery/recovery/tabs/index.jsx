import React from "react";
import DetailTabs from "../../../detail/tabs";
import RecoveryTimelineTab from "./timeline";
import RecoveryCallsTab from "./calls";

export default function RecoveryDetailTabs() {
  const tabs = [
    {
      name: "Timeline",
      children: <RecoveryTimelineTab />,
    },
    {
      name: "Calls",
      children: <RecoveryCallsTab />,
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
