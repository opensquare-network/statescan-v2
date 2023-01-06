import styled, { css, useTheme } from "styled-components";
import { Inter_14_600 } from "../../../styles/text";
import { Flex, FlexCenter } from "../../styled/flex";

const WrapperFlexCenter = styled(FlexCenter)`
  padding: 8px 0;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  /* line */
  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 2px;
    background: ${(p) => p.color};
  }

  /* dot */
  &::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 9999px;
    background: ${(p) => p.color};
  }
`;

const ItemFlex = styled(Flex)`
  color: ${(p) => p.theme.fontPrimary};
  cursor: pointer;
  ${Inter_14_600};

  ${(p) =>
    p.hidden &&
    css`
      span {
        color: #dddddd;
      }

      ${Icon} {
        &::before,
        &::after {
          background: #dddddd;
        }
      }
    `}
`;

export default function AnalyticsChartFooter({
  amountHidden,
  countHidden,
  holdersHidden,
  setAmountHidden,
  setCountHidden,
  setHoldersHidden,
}) {
  const theme = useTheme();

  return (
    <WrapperFlexCenter gap={24}>
      <ItemFlex
        gap={4}
        hidden={amountHidden}
        onClick={() => setAmountHidden(!amountHidden)}
      >
        <Icon color={theme.fillActiveBlue} />
        <span>Transfer Amount</span>
      </ItemFlex>
      <ItemFlex
        hidden={countHidden}
        onClick={() => setCountHidden(!countHidden)}
      >
        <Icon color="#52CC8A" />
        <span>Transfer Count</span>
      </ItemFlex>
      <ItemFlex
        hidden={holdersHidden}
        onClick={() => setHoldersHidden(!holdersHidden)}
      >
        <Icon color="#1FABE8" />
        <span>Holders</span>
      </ItemFlex>
    </WrapperFlexCenter>
  );
}
