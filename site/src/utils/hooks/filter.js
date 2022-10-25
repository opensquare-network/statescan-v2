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

export function useExtrinsicFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const specFilters = useSelector(filtersSelector);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (!specFilters) {
      dispatch(fetchSpecsFilter());
    }
  }, [specFilters]);

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
              getDescendant: () => {
                return {
                  value: item.pallets[0].name,
                  name: "Section",
                  query: "section",
                  options: item.pallets.map((item) => {
                    return {
                      text: item.name,
                      value: item.name,
                      getDescendant: () => {
                        return {
                          value: item.calls[0],
                          name: "Method",
                          query: "method",
                          options: item.calls.map((item) => {
                            return {
                              text: item,
                              value: item,
                            };
                          }),
                        };
                      },
                    };
                  }),
                };
              },
            };
          }),
        ),
      };
      const section = {
        value: getFromQuery(location, "section"),
        name: "Section",
        query: "section",
        options: [{ text: "All", value: "" }].concat(
          sectionOptions.map((item) => {
            return {
              text: item.name,
              value: item.name,
              getDescendant: () => {
                return {
                  value: item.calls[0],
                  name: "Method",
                  query: "method",
                  options: item.calls.map((item) => {
                    return {
                      text: item,
                      value: item,
                    };
                  }),
                };
              },
            };
          }),
        ),
      };
      const method = {
        value: getFromQuery(location, "method"),
        name: "Method",
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
