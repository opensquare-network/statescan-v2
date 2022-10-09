import React from "react";
import styled from "styled-components";
import {
  abbreviateBigNumber,
  bigNumberToLocaleString,
  getEffectiveNumbers,
} from "../utils/viewFuncs/index";

const NotEqual = styled.div`
  ::before {
    content: "≈";
    color: ${(props) => props.theme.textPrimary};
    margin-right: 2px;
  }
`;

export default function ValueDisplay({
  value,
  symbol,
  noWrap,
  abbreviate = true,
}) {
  if (isNaN(value) || noWrap) {
    return `${value} ${symbol}`;
  }

  if (
    (Number(value) >= 1000000 || getEffectiveNumbers(value)?.length >= 11) &&
    abbreviate
  ) {
    const abbreviated = abbreviateBigNumber(value, 2);
    let display = `${abbreviated} ${symbol}`;
    if (getEffectiveNumbers(abbreviated) !== getEffectiveNumbers(value)) {
      display = (
        <NotEqual>
          <span className="figures">{abbreviated}</span>{" "}
          <span className="symbol">{symbol}</span>
        </NotEqual>
      );
    }
    return display;
  }

  const [int, decimal] = String(value).split(".");
  if (decimal?.length > 5) {
    const shortDeciaml = decimal.substring(0, 3);
    return (
      <NotEqual>
        <span className="figures">
          {bigNumberToLocaleString(int)}.{shortDeciaml}
        </span>{" "}
        <span className="symbol">{symbol}</span>
      </NotEqual>
    );
  }
  return (
    <div>
      <span className="figures">{value} </span>
      <span style={{ width: 4 }} />
      <span className="symbol">{symbol}</span>
    </div>
  );
}
