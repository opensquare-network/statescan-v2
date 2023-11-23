import { useSelector } from "react-redux";
import { currentFilterValueSelector } from "../../store/reducers/filterSlice";
import { useLocation } from "react-router-dom";
import { getFromQuery } from "../filterCommon";

export function useTimeDimensionFilterItems() {
  const currentFilterValue = useSelector(currentFilterValueSelector);
  const location = useLocation();

  const timeDimensionValue =
    currentFilterValue.time_dimension ??
    getFromQuery(location, "time_dimension", "block");
  const blockStartValue =
    currentFilterValue.block_start ?? getFromQuery(location, "block_start");
  const blockEndValue =
    currentFilterValue.block_end ?? getFromQuery(location, "block_end");
  const dateStartValue =
    currentFilterValue.date_start ?? getFromQuery(location, "date_start");
  const dateEndValue =
    currentFilterValue.date_end ?? getFromQuery(location, "date_end");

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

  const dateStart = {
    type: "date",
    value: dateStartValue,
    name: "Start",
    query: "date_start",
    width: 160,
  };

  const dateEnd = {
    ...dateStart,
    value: dateEndValue,
    name: "End",
    query: "date_end",
    datepickerProps: {
      minDate: dateStartValue,
    },
  };

  return [
    timeDimension,
    ...(timeDimensionValue === "block" ? [blockStart, blockEnd] : []),
    ...(timeDimensionValue === "date" ? [dateStart, dateEnd] : []),
  ].filter(Boolean);
}
