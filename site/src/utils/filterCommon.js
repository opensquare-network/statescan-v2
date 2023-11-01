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

export function omitExemptedMethods(section = "", methods = []) {
  const omitMethodsMap = {
    System: ["ExtrinsicSuccess", "ExtrinsicFailed"],
    ParaInclusion: ["CandidateIncluded", "CandidateBacked"],
    Timestamp: ["set"],
  };

  // compat lower first
  Object.entries(omitMethodsMap).forEach(([key, value]) => {
    omitMethodsMap[stringLowerFirst(key)] = value;
  });

  const shouldOmitMethods = omitMethodsMap[section] ?? [];

  return methods.filter((method) => !shouldOmitMethods.includes(method));
}
