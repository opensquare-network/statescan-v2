import React from "react";
import DetailTabs from "../../../detail/tabs";
import RecoverableTimelineTab from "./timeline";
import RecoverableRecoveriesTab from "./recoveries";
import RecoverableCallsTab from "./calls";

export default function RecoverableDetailTabs() {
  const tabs = [
    {
      name: "Timeline",
      children: <RecoverableTimelineTab />,
    },
    {
      name: "Recoveries",
      children: <RecoverableRecoveriesTab />,
    },
    {
      name: "Calls",
      children: <RecoverableCallsTab />,
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
