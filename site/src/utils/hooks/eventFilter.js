import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecsFilter,
  filtersSelector,
} from "../../store/reducers/filterSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { stringLowerFirst } from "@polkadot/util";
import {
  AllOption,
  getFromQuery,
  sortByName,
  makeOptionWithEmptyDescendant,
} from "../filterCommon";
import { extrinsicOnlyFilter, noExtrinsicResultFilter } from "../constants";

function getSpecVersionDescendant(specVersion) {
  return {
    value: "",
    name: "Section",
    query: "section",
    isSearch: true,
    options: [makeOptionWithEmptyDescendant(AllOption, "Method")].concat(
      specVersion.pallets
        .filter((section) => {
          return section?.events?.length > 0;
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
      section.events
        .map((method) => {
          return {
            name: method,
            text: method,
            value: method,
          };
        })
        .sort(sortByName),
    ),
  };
}

export function useEventFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const specFilters = useSelector(filtersSelector);
  const [filters, setFilters] = useState([]);
  const isExtrinsicOnly = getFromQuery(location, "is_extrinsic", "true");
  const noExtrinsicResult = getFromQuery(
    location,
    "no_extrinsic_result",
    "true",
  );

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
          return section?.events?.length > 0;
        })
        .sort(sortByName);

      const methodOptions = (
        sectionOptions.find(
          (section) =>
            stringLowerFirst(section.name) ===
            getFromQuery(location, "section"),
        ) ?? { events: [] }
      ).events;

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
              value: stringLowerFirst(section.name),
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
              value: method,
            };
          }),
        ),
        defaultDisplay: getFromQuery(location, "method"),
      };
      setFilters([specs, section, method]);
    }
  }, [specFilters, location]);

  return [
    ...filters,
    { ...extrinsicOnlyFilter, value: isExtrinsicOnly },
    { ...noExtrinsicResultFilter, value: noExtrinsicResult },
  ];
}
