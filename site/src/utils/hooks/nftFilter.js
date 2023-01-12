import { useLocation } from "react-router-dom";
import { getFromQuery } from "../filterCommon";

export function useNftFilter() {
  const location = useLocation();
  return [
    {
      value: getFromQuery(location, "category"),
      name: "Category",
      isSearch: false,
      query: "category",
      options: [
        { text: "All", value: "" },
        { text: "Recognized", value: "recognized" },
        { text: "Unrecognized", value: "unrecognized" },
      ],
      defaultDisplay: getFromQuery(location, "category"),
    },
    {
      value: getFromQuery(location, "status"),
      name: "Status",
      isSearch: false,
      query: "status",
      options: [
        { text: "All", value: "" },
        { text: "Frozen", value: "frozen" },
      ],
      defaultDisplay: getFromQuery(location, "status"),
    },
  ];
}
