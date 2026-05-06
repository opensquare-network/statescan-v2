import BigNumber from "bignumber.js";
import styled from "styled-components";
import ValueDisplay from "../../displayValue";
import LoadingInlineAnimationIcon from "../../icons/loadingInlineAnimationIcon";
import Tooltip from "../../tooltip";
import { Inter_12_500, Inter_14_600, Inter_18_700 } from "../../../styles/text";
import { bigNumberToLocaleString } from "../../../utils/viewFuncs";
import { toLidoAmount } from "../../../utils/viewFuncs/lido";

export const IconSlot = styled.div`
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  margin-top: 0;

  > svg {
    width: 40px;
    height: 40px;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Label = styled.div`
  ${Inter_14_600};
  color: ${(p) => p.theme.fontSecondary};
  min-width: 0;
  margin-bottom: 12px;
`;

export const MetricValue = styled.div`
  ${Inter_18_700};
  color: ${(p) => p.theme.fontPrimary};
  min-width: 0;
`;

export const MetricLabel = styled.div`
  ${Inter_12_500};
  color: ${(p) => p.theme.fontTertiary};
  margin-bottom: 4px;
`;

const ApproxValue = styled.div`
  display: inline-flex;

  ::before {
    content: "≈";
    color: ${(props) => props.theme.textPrimary};
    margin-right: 2px;
  }
`;

const OnchainValueLoading = styled.span`
  display: inline-flex;
  align-items: center;
  width: 14px;
  height: 18px;
  vertical-align: -2px;

  > svg {
    display: block;
    width: 14px;
    height: 14px;
  }
`;

export function Amount({ value, symbol, decimals }) {
  return (
    <ValueDisplay
      value={toLidoAmount(value, decimals)}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

export function formatCount(value) {
  return new BigNumber(value || 0).toFormat(0);
}

function toRateDisplayValue(value, decimals) {
  return new BigNumber(toLidoAmount(value, decimals))
    .decimalPlaces(4)
    .toString();
}

export function OnchainAmount({ value, symbol, decimals, loading }) {
  if (loading) {
    return (
      <OnchainValueLoading>
        <LoadingInlineAnimationIcon />
      </OnchainValueLoading>
    );
  }

  if (value == null) {
    return "--";
  }

  return <Amount value={value} symbol={symbol} decimals={decimals} />;
}

export function RateValue({ value, decimals, loading }) {
  if (loading) {
    return (
      <OnchainValueLoading>
        <LoadingInlineAnimationIcon />
      </OnchainValueLoading>
    );
  }

  if (value == null) {
    return "--";
  }

  const fullValue = toLidoAmount(value, decimals);
  const displayValue = toRateDisplayValue(value, decimals);
  const display = (
    <ValueDisplay value={displayValue} symbol="" abbreviate={false} />
  );

  if (new BigNumber(fullValue).eq(displayValue)) {
    return display;
  }

  return (
    <Tooltip tip={bigNumberToLocaleString(fullValue)}>
      <ApproxValue>{display}</ApproxValue>
    </Tooltip>
  );
}
