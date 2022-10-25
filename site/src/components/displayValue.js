import React from "react";
import styled from "styled-components";
import { bigNumberToLocaleString } from "../utils/viewFuncs/index";
import { abbreviateBigNumber, getEffectiveNumbers } from "@osn/common";

const Wrapper = styled.div`
  white-space: nowrap;
`;

const NotEqual = styled.div`
  ::before {
    content: "≈";
    color: ${(props) => props.theme.textPrimary};
    margin-right: 2px;
  }
  white-space: nowrap;
`;

export default function ValueDisplay({ value, symbol, abbreviate = true }) {
  if (isNaN(value)) {
    return (
      <Wrapper>
        {value} {symbol}
      </Wrapper>
    );
  }

  if (
    (Number(value) >= 1000000 || getEffectiveNumbers(value)?.length >= 11) &&
    abbreviate
  ) {
    const abbreviated = abbreviateBigNumber(value, 2);
    let display = (
      <Wrapper>
        {abbreviated} {symbol}
      </Wrapper>
    );
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
    <Wrapper>
      <span className="figures">{value} </span>
      <span style={{ width: 4 }} />
      <span className="symbol">{symbol}</span>
    </Wrapper>
  );
}
