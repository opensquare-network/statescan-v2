import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecsFilter,
  filtersSelector,
} from "../../store/reducers/filterSlice";
import { useEffect, useState } from "react";
import { basicFilters } from "../constants";
import { useLocation } from "react-router-dom";
import * as queryString from "query-string";

const getFromQuery = (location, key, defaultValue = "") => {
  return queryString.parse(location.search)?.[key] ?? defaultValue;
};

function getSectionDescendant(section) {
  return {
    value: section.calls[0],
    name: "Method",
    query: "method",
    options: section.calls.map((method) => {
      return {
        text: method,
        value: method,
      };
    }),
  };
}

function getSpecVersionDescendant(specVersion) {
  return {
    value: specVersion.pallets[0].name,
    name: "Section",
    query: "section",
    options: specVersion.pallets.map((section) => {
      return {
        text: section.name,
        value: section.name,
        descendant: getSectionDescendant(section),
      };
    }),
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
      const version = getFromQuery(location, "version");
      const sectionOptions = (
        specFilters.find((spec) => spec.specVersion === version) ??
        specFilters[0]
      ).pallets;
      const methodOptions = (
        sectionOptions.find(
          (section) => section.name === getFromQuery(location, "section"),
        ) ?? sectionOptions[0]
      ).calls;

      const specs = {
        value: version,
        name: "Spec",
        query: "version",
        options: [{ text: "All", value: "" }].concat(
          specFilters.map((item) => {
            return {
              text: item.specVersion.toString(),
              value: item.specVersion.toString(),
              descendant: getSpecVersionDescendant(item),
            };
          }),
        ),
      };
      const section = {
        value: getFromQuery(location, "section"),
        name: "Section",
        query: "section",
        isSearch: true,
        options: [{ text: "All", value: "" }].concat(
          sectionOptions.map((section) => {
            return {
              text: section.name,
              value: section.name,
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
              value: method,
            };
          }),
        ),
      };
      setFilters([specs, section, method]);
    }
  }, [specFilters, location]);

  return [...filters, ...basicFilters];
}
