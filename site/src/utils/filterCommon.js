import * as queryString from "query-string";
import { stringLowerFirst } from "@polkadot/util";

export const AllOption = {
  value: "",
  text: "All",
};

export const getFromQuery = (location, key, defaultValue = "") => {
  return (
    queryString.parse(location.search)?.[key] ?? defaultValue?.toString() ?? ""
  );
};

export const sortByName = (a, b) => a?.name?.localeCompare(b?.name);

export const makeOptionWithEmptyDescendant = (option, descendantName) => {
  return {
    ...option,
    isSearch: true,
    descendant: {
      value: "",
      name: descendantName,
      query: descendantName.toLowerCase(),
      options: [AllOption],
    },
  };
};

export function omitExemptedEvents(section = "", events = []) {
  const omitEventsMap = {
    System: ["ExtrinsicSuccess", "ExtrinsicFailed"],
    ParaInclusion: ["CandidateIncluded", "CandidateBacked"],
  };

  Object.entries(omitEventsMap).forEach(([key, value]) => {
    omitEventsMap[stringLowerFirst(key)] = value;
  });

  const shouldOmitMethods = omitEventsMap[section] ?? [];

  return events.filter((event) => !shouldOmitMethods.includes(event));
}

export function omitExemptedCalls(section = "", calls = []) {
  const omitCallsMap = {
    Timestamp: ["set"],
  };

  Object.entries(omitCallsMap).forEach(([key, value]) => {
    omitCallsMap[stringLowerFirst(key)] = value;
  });

  const shouldOmitMethods = omitCallsMap[section] ?? [];

  return calls.filter((call) => !shouldOmitMethods.includes(call));
}
