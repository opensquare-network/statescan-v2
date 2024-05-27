import React from "react";
import DetailTabs from "../../../detail/tabs";
import RecoveryTimelineTab from "./timeline";

export default function RecoveryDetailTabs() {
  const tabs = [
    {
      name: "Timeline",
      children: <RecoveryTimelineTab />,
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
