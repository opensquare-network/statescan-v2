import styled, { css } from "styled-components";
import { Inter_12_600 } from "../../../styles/text";
import TimeHead from "./timeHead";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeType,
  timeTypeSelector,
} from "../../../store/reducers/preferenceSlice";
import { useEffect } from "react";
import { smcss } from "../../../styles/responsive";
import { w, w_full } from "../../../styles/tailwindcss";
import last from "lodash.last";
import SortableHead from "./sortableHead";
import { useState } from "react";

const Tr = styled.tr`
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
  text-align: left;
`;

const Th = styled.th`
  box-sizing: border-box;
  padding: 16px 24px;
  ${Inter_12_600};
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;
  text-align: ${(p) => p.align};
  ${(p) =>
    p.minWidth &&
    css`
      min-width: ${p.minWidth}px;
    `};
  ${(p) =>
    p.width &&
    css`
      width: ${p.width}px;
      min-width: ${p.minWidth || p.width}px;
    `};

  ${(p) =>
    p.shouldFlexWidth &&
    css`
      ${w_full};
      ${smcss(w(p.width))};
    `}
`;

export default function TableHead({ heads }) {
  const dispatch = useDispatch();
  const timeType = useSelector(timeTypeSelector);
  const isDataTableTypeLast = last(heads)?.type === "data";
  const [activeSortQueryValue, setActiveSortQueryValue] = useState("");

  useEffect(() => {
    const timeType = localStorage.getItem("timeType");
    if (timeType) {
      dispatch(setTimeType(timeType));
    }
  }, [dispatch]);

  const doSetTimeType = (timeType) => {
    dispatch(setTimeType(timeType));
  };

  return (
    <thead>
      <Tr>
        {heads.map((head, index) => {
          let { name, align = "left", type, width, minWidth } = head ?? {};

          const isSecondToLast = heads.length - 2 === index;
          const shouldFlexWidthSecondToLast =
            isDataTableTypeLast && isSecondToLast;

          let content = name;
          if (type === "time") {
            content = (
              <TimeHead timeType={timeType} setTimeType={doSetTimeType} />
            );
          }

          if (type === "sortable") {
            content = (
              <SortableHead
                activeSortQueryValue={activeSortQueryValue}
                setActiveSortQueryValue={setActiveSortQueryValue}
                head={head}
              >
                {name}
              </SortableHead>
            );
          }

          if (type === "data") {
            width = width ?? 76;
            content = "";
          }

          if (type === "call") {
            width = width ?? 200;
          }

          return (
            <Th
              key={index}
              width={width}
              minWidth={minWidth}
              align={align}
              shouldFlexWidth={shouldFlexWidthSecondToLast}
            >
              {content}
            </Th>
          );
        })}
      </Tr>
    </thead>
  );
}
