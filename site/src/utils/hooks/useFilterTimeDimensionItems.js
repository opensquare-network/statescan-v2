import { useSelector } from "react-redux";
import { currentFilterValueSelector } from "../../store/reducers/filterSlice";
import { useLocation } from "react-router-dom";
import { getFromQuery } from "../filterCommon";

export function useFilterTimeDimensionitems() {
  const currentFilterValue = useSelector(currentFilterValueSelector);
  const location = useLocation();

  const timeDimensionValue =
    currentFilterValue.time_dimension ??
    getFromQuery(location, "time_dimension", "block");
  const blockStartValue =
    currentFilterValue.blockStart ?? getFromQuery(location, "block_start");
  const blockEndValue =
    currentFilterValue.blockEnd ?? getFromQuery(location, "block_end");

  const timeDimension = {
    value: timeDimensionValue,
    name: "Time Dimension",
    query: "time_dimension",
    // TODO: filter, maybe not persist
    // persist: false,
    options: [
      {
        text: "Block",
        value: "block",
      },
      {
        text: "Date",
        value: "date",
      },
    ],
  };

  const blockStart = {
    type: "input",
    value: blockStartValue,
    name: "Start",
    query: "block_start",
    width: 160,
    inputProps: {
      placeholder: "Blocks",
    },
  };
  const blockEnd = {
    ...blockStart,
    value: blockEndValue,
    name: "End",
    query: "block_end",
  };

  return [
    timeDimension,
    ...(timeDimensionValue === "block" ? [blockStart, blockEnd] : []),
  ].filter(Boolean);
}
