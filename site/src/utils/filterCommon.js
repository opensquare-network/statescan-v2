import * as queryString from "query-string";

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
