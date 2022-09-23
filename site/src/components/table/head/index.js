import styled from "styled-components";
import { Inter_12_600 } from "../../../styles/text";
import TimeHead from "./timeHead";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeType,
  timeTypeSelector,
} from "../../../store/reducers/preferenceSlice";
import { useEffect } from "react";

const Th = styled.th`
  box-sizing: border-box;
  padding: 16px 24px;
  ${Inter_12_600};
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;
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

  return heads.map(({ name, align, type, width }, index) => {
    const style = {
      textAlign: align ?? "left",
      width: width ?? "100%",
    };

    let content = name;
    if (type === "time")
      content = <TimeHead timeType={timeType} setTimeType={doSetTimeType} />;

    return (
      <Th style={style} key={index}>
        {content}
      </Th>
    );
  });
}
