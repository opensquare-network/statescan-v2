import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecsFilter,
  filtersSelector,
} from "../../store/reducers/filterSlice";
import { useEffect, useState } from "react";
import { basicFilters } from "../constants";
import { useLocation } from "react-router-dom";
import * as queryString from "query-string";
const { stringCamelCase } = require("@polkadot/util");

const getFromQuery = (location, key, defaultValue = "") => {
  return (
    queryString.parse(location.search)?.[key] ?? defaultValue?.toString() ?? ""
  );
};

const AllOption = {
  value: "",
  text: "All",
};

const sortByName = (a, b) => a?.name?.localeCompare(b?.name);

const makeOptionWithEmptyDescendant = (option, descendantName) => {
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

function getSpecVersionDescendant(specVersion) {
  return {
    value: "",
    name: "Section",
    query: "section",
    isSearch: true,
    options: [makeOptionWithEmptyDescendant(AllOption, "Method")].concat(
      specVersion.pallets
        .filter((section) => {
          return section?.calls?.length > 0;
        })
        .map((section) => {
          return {
            name: section.name,
            text: section.name,
            value: section.name,
            descendant: getSectionDescendant(section),
          };
        })
        .sort(sortByName),
    ),
  };
}

function getSectionDescendant(section) {
  return {
    value: "",
    name: "Method",
    query: "method",
    isSearch: true,
    options: [AllOption].concat(
      section.calls
        .map((method) => {
          return {
            name: method,
            text: method,
            value: stringCamelCase(method),
          };
        })
        .sort(sortByName),
    ),
  };
}

export function useExtrinsicFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const specFilters = useSelector(filtersSelector);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (!specFilters) {
      dispatch(fetchSpecsFilter());
    }
  }, [dispatch, specFilters]);

  useEffect(() => {
    if (specFilters) {
      // load from URL query
      const version = getFromQuery(
        location,
        "spec",
        specFilters?.[0]?.specVersion,
      );

      const sectionOptions = (
        (
          specFilters.find((spec) => spec.specVersion === version) ??
          specFilters[0]
        )?.pallets ?? []
      )
        .filter((section) => {
          return section?.calls?.length > 0;
        })
        .sort(sortByName);

      const methodOptions = (
        sectionOptions.find(
          (section) =>
            section.name.toLowerCase() === getFromQuery(location, "section"),
        ) ?? { calls: [] }
      ).calls;

      // generate dropdown data
      const specs = {
        value: version,
        name: "Spec",
        query: "spec",
        options: specFilters.map((item) => {
          return {
            text: item.specVersion.toString(),
            value: item.specVersion.toString(),
            descendant: getSpecVersionDescendant(item),
          };
        }),
        defaultDisplay: version,
      };

      const section = {
        value: getFromQuery(location, "section"),
        name: "Section",
        query: "section",
        isSearch: true,
        options: [makeOptionWithEmptyDescendant(AllOption, "Method")].concat(
          sectionOptions.map((section) => {
            return {
              text: section.name,
              value: section.name.toLowerCase(),
              descendant: getSectionDescendant(section),
            };
          }),
        ),
        defaultDisplay: getFromQuery(location, "section"),
      };

      const method = {
        value: getFromQuery(location, "method"),
        name: "Method",
        isSearch: true,
        query: "method",
        options: [{ text: "All", value: "" }].concat(
          methodOptions.map((method) => {
            return {
              text: method,
              value: stringCamelCase(method),
            };
          }),
        ),
        defaultDisplay: getFromQuery(location, "method"),
      };
      setFilters([specs, section, method]);
    }
  }, [specFilters, location]);

  return [...filters, ...basicFilters];
}
