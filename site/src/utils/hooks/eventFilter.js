import { useDispatch, useSelector } from "react-redux";
import {
  currentFilterValueSelector,
  fetchSpecsFilter,
  filtersSelector,
  setCurrentFilterValue,
} from "../../store/reducers/filterSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { stringLowerFirst } from "@polkadot/util";
import {
  AllOption,
  getFromQuery,
  sortByName,
  makeOptionWithEmptyDescendant,
  omitExemptedEventMethods,
} from "../filterCommon";
import { useTimeDimensionFilterItems } from "./useTimeDimensionFilterItems";

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
      omitExemptedEventMethods(section.name, section.events)
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
  const currentFilterValue = useSelector(currentFilterValueSelector);
  const [filters, setFilters] = useState([]);
  const timeDimensionItems = useTimeDimensionFilterItems();

  useEffect(() => {
    if (!specFilters) {
      dispatch(fetchSpecsFilter());
    }
  }, [dispatch, specFilters]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentFilterValue({}));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (specFilters) {
      const specValue =
        currentFilterValue.spec ??
        getFromQuery(location, "spec", specFilters?.[0]?.specVersion);
      const methodValue =
        currentFilterValue.method ?? getFromQuery(location, "method");
      const sectionValue =
        currentFilterValue.section ?? getFromQuery(location, "section");

      const sectionOptions = (
        (
          specFilters.find((spec) => spec.specVersion === specValue) ??
          specFilters[0]
        )?.pallets ?? []
      )
        .filter((section) => {
          return section?.events?.length > 0;
        })
        .sort(sortByName);

      const methodOptions = omitExemptedEventMethods(
        sectionValue,
        (
          sectionOptions.find(
            (section) => stringLowerFirst(section.name) === sectionValue,
          ) ?? { events: [] }
        ).events,
      );

      // generate dropdown data
      const specs = {
        value: specValue,
        name: "Spec",
        query: "spec",
        options: specFilters.map((item) => {
          return {
            text: item.specVersion.toString(),
            value: item.specVersion.toString(),
            descendant: getSpecVersionDescendant(item),
          };
        }),
        defaultDisplay: specValue,
      };

      const section = {
        value: sectionValue,
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
        defaultDisplay: sectionValue,
      };

      const method = {
        value: methodValue,
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
        defaultDisplay: methodValue,
      };
      setFilters([
        specs,
        section,
        method,
        { type: "newline" },
        ...timeDimensionItems,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specFilters, location, currentFilterValue]);

  return filters;
}
