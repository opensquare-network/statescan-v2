import DetailTabs from "../../../detail/tabs";
import RecoverableTimelineTab from "./timeline";
import RecoverableRecoveriesTab from "./recoveries";
import RecoverableCallsTab from "./calls";
import { useRecoverableCountsData } from "../../../../hooks/recovery/useRecoverableCountsData";

export default function RecoverableDetailTabs() {
  const { data } = useRecoverableCountsData();

  const tabs = [
    {
      name: "Timeline",
      children: <RecoverableTimelineTab />,
    },
    {
      name: "Recoveries",
      count: data?.recoveries,
      children: <RecoverableRecoveriesTab />,
    },
    {
      name: "Calls",
      count: data?.calls,
      children: <RecoverableCallsTab />,
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
