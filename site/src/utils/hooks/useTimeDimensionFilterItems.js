import { useSelector } from "react-redux";
import { currentFilterValueSelector } from "../../store/reducers/filterSlice";
import { useLocation } from "react-router-dom";
import { getFromQuery } from "../filterCommon";
import { useMemo } from "react";

export function useTimeDimensionFilterItems() {
  const currentFilterValue = useSelector(currentFilterValueSelector);
  const location = useLocation();

  return useMemo(() => {
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
      type: "date_start",
      value: dateStartValue,
      name: "Start",
      query: "date_start",
    };

    const dateEnd = {
      type: "date_end",
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
  }, [
    currentFilterValue.block_end,
    currentFilterValue.block_start,
    currentFilterValue.date_end,
    currentFilterValue.date_start,
    currentFilterValue.time_dimension,
    location,
  ]);
}
