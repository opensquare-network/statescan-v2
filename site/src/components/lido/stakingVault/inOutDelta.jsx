import BigNumber from "bignumber.js";
import isNil from "lodash.isnil";
import styled from "styled-components";
import LidoValue from "../value";

function getDeltaColor({ positive, negative, theme }) {
  if (positive) {
    return "var(--fillPositive)";
  }

  if (negative) {
    return "var(--fillNegative)";
  }

  return theme.fontPrimary;
}

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  color: ${getDeltaColor};
`;

export default function LidoInOutDelta({ value, decimals, symbol }) {
  if (isNil(value)) {
    return "--";
  }

  const bn = new BigNumber(value);

  return (
    <Wrapper positive={bn.gt(0)} negative={bn.lt(0)}>
      {bn.lt(0) ? "-" : ""}
      <LidoValue
        value={bn.abs().toString()}
        decimals={decimals}
        symbol={symbol}
      />
    </Wrapper>
  );
}
