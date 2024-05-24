import { useDispatch, useSelector } from "react-redux";
import {
  currentFilterValueSelector,
  fetchSpecsFilter,
  filtersSelector,
  setCurrentFilterValue,
} from "../../../store/reducers/filterSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { stringCamelCase, stringLowerFirst } from "@polkadot/util";
import {
  AllOption,
  getFromQuery,
  sortByName,
  makeOptionWithEmptyDescendant,
  omitExemptedCallMethods,
} from "../../../utils/filterCommon";

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

export function useMethodFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const specFilters = useSelector(filtersSelector);
  const currentFilterValue = useSelector(currentFilterValueSelector);
  const [filters, setFilters] = useState([]);

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
      const sectionValue =
        currentFilterValue.section ?? getFromQuery(location, "section");
      const methodValue =
        currentFilterValue.method ?? getFromQuery(location, "method");

      const sectionOptions = (
        (
          specFilters.find((spec) => spec.specVersion === specValue) ??
          specFilters[0]
        )?.pallets ?? []
      )
        .filter((section) => {
          return section?.calls?.length > 0;
        })
        .sort(sortByName);

      const methodOptions = omitExemptedCallMethods(
        sectionValue,
        (
          sectionOptions.find(
            (section) => stringLowerFirst(section.name) === sectionValue,
          ) ?? { calls: [] }
        ).calls,
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
              value: stringCamelCase(method),
            };
          }),
        ),
        defaultDisplay: methodValue,
      };

      setFilters([specs, section, method]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specFilters, location, currentFilterValue]);

  return filters;
}
