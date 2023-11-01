import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchSpecsFilter,
  filtersSelector,
} from "../../store/reducers/filterSlice";
import { signedOnlyFilter } from "../constants";
import { stringCamelCase, stringLowerFirst } from "@polkadot/util";
import {
  AllOption,
  getFromQuery,
  sortByName,
  makeOptionWithEmptyDescendant,
  omitExemptedCallMethods,
} from "../filterCommon";

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
      omitExemptedCallMethods(section.name, section.calls)
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

export function useCallsFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const specFilters = useSelector(filtersSelector);
  const [filters, setFilters] = useState([]);
  const signedOnly = getFromQuery(location, "signed_only", "true");
  const sectionQueryValue = getFromQuery(location, "section");

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

      const methodOptions = omitExemptedCallMethods(
        sectionQueryValue,
        (
          sectionOptions.find(
            (section) => stringLowerFirst(section.name) === sectionQueryValue,
          ) ?? { calls: [] }
        ).calls,
      );

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
        value: sectionQueryValue,
        name: "Section",
        query: "section",
        isSearch: true,
        options: [makeOptionWithEmptyDescendant(AllOption, "Method")].concat(
          sectionOptions.map((section) => {
            return {
              text: section.name,
              value: stringLowerFirst(section.name),
              descendant: getSectionDescendant(section),
            };
          }),
        ),
        defaultDisplay: sectionQueryValue,
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
  }, [specFilters, location, sectionQueryValue]);

  return [
    ...filters,
    { type: "divider" },
    { ...signedOnlyFilter, value: signedOnly },
  ];
}
