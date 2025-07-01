import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecsFilter,
  filtersSelector,
} from "../../../store/reducers/filterSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { stringCamelCase } from "@polkadot/util";
import {
  AllOption,
  getFromQuery,
  sortByName,
  makeOptionWithEmptyDescendant,
  omitExemptedEventMethods,
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
          return section?.events?.length > 0;
        })
        .map((section) => {
          return {
            name: section.name,
            text: section.name,
            value: stringCamelCase(section.name),
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

export function useEventSectionMethodFilter() {
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
      const specValue = getFromQuery(
        location,
        "spec",
        specFilters?.[0]?.specVersion,
      );
      const methodValue = getFromQuery(location, "method");
      const sectionValue = getFromQuery(location, "section");

      const sectionOptions = (
        (
          specFilters.find(
            (spec) => String(spec.specVersion) === String(specValue),
          ) ?? specFilters[0]
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
            (section) => stringCamelCase(section.name) === sectionValue,
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
        optionWidth: "auto",
        value: sectionValue,
        name: "Section",
        query: "section",
        isSearch: true,
        options: [makeOptionWithEmptyDescendant(AllOption, "Method")].concat(
          sectionOptions.map((section) => {
            return {
              text: section.name,
              value: stringCamelCase(section.name),
              descendant: getSectionDescendant(section),
            };
          }),
        ),
        defaultDisplay: sectionValue,
      };

      const method = {
        optionWidth: "auto",
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
      setFilters([specs, section, method]);
    }
  }, [specFilters, location]);

  return filters;
}
