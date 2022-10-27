import styled, { css } from "styled-components";
import { Inter_12_600 } from "../../../styles/text";
import TimeHead from "./timeHead";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeType,
  timeTypeSelector,
} from "../../../store/reducers/preferenceSlice";
import { useEffect } from "react";
import { lgcss, mdcss } from "../../../styles/responsive";

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
`;

const CallTh = styled(Th)`
  width: 100%;
  ${lgcss(css`
    width: 250px;
  `)}
  ${mdcss(css`
    width: 200px;
  `)}
`;

export default function TableHead({ heads }) {
  const dispatch = useDispatch();
  const timeType = useSelector(timeTypeSelector);

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
        {heads.map(({ name, align, type, width }, index) => {
          const style = {
            textAlign: align ?? "left",
            ...(width ? { width } : {}),
          };

          let content = name;
          if (type === "time") {
            content = (
              <TimeHead timeType={timeType} setTimeType={doSetTimeType} />
            );
          }
          if (type === "data") {
            style.width = width ?? 76;
            content = "";
          }

          if (type === "call") {
            return (
              <CallTh style={style} key={index}>
                {content}
              </CallTh>
            );
          }

          return (
            <Th style={style} key={index}>
              {content}
            </Th>
          );
        })}
      </Tr>
    </thead>
  );
}
