import React from "react";
import styled from "styled-components";
import { bigNumberToLocaleString } from "../utils/viewFuncs";
import { abbreviateBigNumber, getEffectiveNumbers } from "@osn/common";
import TooltipOrigin from "./tooltip";
import { inline_block, truncate } from "../styles/tailwindcss";

const Wrapper = styled.div`
  white-space: nowrap;
  display: inline-flex;
`;

const NotEqual = styled.div`
  ::before {
    content: "≈";
    color: ${(props) => props.theme.textPrimary};
    margin-right: 2px;
  }
  white-space: nowrap;
`;

const Tooltip = styled(TooltipOrigin)`
  ${inline_block};
  width: auto;
`;

const SybmolEllipsis = styled.span`
  ${truncate};
  display: inline-block;
`;

export default function ValueDisplay({
  value,
  symbol,
  abbreviate = true,
  showNotEqualTooltip = false,
  symbolWidth = 0,
}) {
  if (isNaN(value)) {
    return <Wrapper>--</Wrapper>;
  }

  let symbolDisplay = <span className="symbol">{symbol}</span>;

  if (symbolWidth > 0) {
    symbolDisplay = (
      <Tooltip tip={symbol}>
        <SybmolEllipsis className="symbol" style={{ width: symbolWidth }}>
          {symbol}
        </SybmolEllipsis>
      </Tooltip>
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
          <span className="figures">{abbreviated}</span> {symbolDisplay}
        </NotEqual>
      );

      if (showNotEqualTooltip) {
        display = (
          <Tooltip tip={bigNumberToLocaleString(value)}>{display}</Tooltip>
        );
      }
    }
    return display;
  }

  const [int, decimal] = String(value).split(".");
  if (decimal?.length > 5 && abbreviate) {
    const shortDeciaml = decimal.substring(0, 2);

    let display = (
      <NotEqual>
        <span className="figures">
          {bigNumberToLocaleString(int)}.{shortDeciaml}
        </span>{" "}
        {symbolDisplay}
      </NotEqual>
    );

    if (showNotEqualTooltip) {
      display = (
        <Tooltip tip={bigNumberToLocaleString(value)}>{display}</Tooltip>
      );
    }

    return display;
  }
  return (
    <Wrapper>
      <span className="figures">{value} </span>
      <span style={{ width: 4 }} />
      {symbolDisplay}
    </Wrapper>
  );
}
