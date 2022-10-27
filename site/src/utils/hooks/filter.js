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
console.log(stringCamelCase);
const getFromQuery = (location, key, defaultValue = "") => {
  return (
    queryString.parse(location.search)?.[key] ?? defaultValue?.toString() ?? ""
  );
};

const AllOption = {
  value: "",
  text: "All",
};

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
    options: [makeOptionWithEmptyDescendant(AllOption, "Method")].concat(
      specVersion.pallets.map((section) => {
        return {
          text: section.name,
          value: section.name,
          descendant: getSectionDescendant(section),
        };
      }),
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
      section.calls.map((method) => {
        return {
          text: method,
          value: stringCamelCase(method),
        };
      }),
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
        "version",
        specFilters?.[0]?.specVersion,
      );

      const sectionOptions = (
        (
          specFilters.find((spec) => spec.specVersion === version) ??
          specFilters[0]
        )?.pallets ?? []
      ).filter((section) => {
        return section?.calls?.length > 0;
      });

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
        query: "version",
        options: specFilters.map((item) => {
          return {
            text: item.specVersion.toString(),
            value: item.specVersion.toString(),
            descendant: getSpecVersionDescendant(item),
          };
        }),
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
      };
      setFilters([specs, section, method]);
    }
  }, [specFilters, location]);

  return [...filters, ...basicFilters];
}
