import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { assetDetailSelector } from "../../../store/reducers/assetSlice";
import { Panel } from "../../styled/panel";
import AnalyticsChartBody from "./body";
import AnalyticsChartFooter from "./footer";
import AnalyticsChartHeader from "./header";

const Wrapper = styled(Panel)`
  padding: 8px 24px;
`;

export default function AnalyticsChart() {
  const [range, setRange] = useState("all");
  const detail = useSelector(assetDetailSelector);
  const [amountHidden, setAmountHidden] = useState(false);
  const [countHidden, setCountHidden] = useState(false);
  const [holdersHidden, setHoldersHidden] = useState(false);

  return (
    <Wrapper>
      <AnalyticsChartHeader
        assetId={detail?.assetId}
        symbol={detail?.metadata?.symbol}
        range={range}
        setRange={setRange}
      />

      <AnalyticsChartBody />

      <AnalyticsChartFooter
        amountHidden={amountHidden}
        countHidden={countHidden}
        holdersHidden={holdersHidden}
        setAmountHidden={setAmountHidden}
        setCountHidden={setCountHidden}
        setHoldersHidden={setHoldersHidden}
      />
    </Wrapper>
  );
}
