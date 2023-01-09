import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import api from "../../../services/api";
import { assetDetailSelector } from "../../../store/reducers/assetSlice";
import { ASSET_ANALYTICS_RANGE } from "../../../utils/constants";
import { Panel } from "../../styled/panel";
import AnalyticsChartBody from "./body";
import AnalyticsChartFooter from "./footer";
import AnalyticsChartHeader from "./header";

const Wrapper = styled(Panel)`
  padding: 8px 24px;
`;

export default function AnalyticsChart({ url }) {
  const [range, setRange] = useState(ASSET_ANALYTICS_RANGE.ALL);
  const detail = useSelector(assetDetailSelector);
  const [amountHidden, setAmountHidden] = useState(false);
  const [countHidden, setCountHidden] = useState(false);
  const [holdersHidden, setHoldersHidden] = useState(false);

  const [assetsData, setAssetsData] = useState([]);

  const rangeData = useMemo(() => {
    const rangeDateMap = {
      [ASSET_ANALYTICS_RANGE.ONE_MONTH]: "months",
      [ASSET_ANALYTICS_RANGE.ONE_YEAR]: "years",
    };

    if (range === ASSET_ANALYTICS_RANGE.ALL) {
      return assetsData;
    } else {
      const ts = moment().subtract(1, rangeDateMap[range]).valueOf();
      return assetsData.filter((item) => item?.indexer?.blockTime > ts);
    }
  }, [range, assetsData]);

  useEffect(() => {
    if (!url) {
      return;
    }

    api.fetch(url).then(({ result }) => {
      if (result) {
        setAssetsData(result);
      }
    });
  }, [url]);

  return (
    <Wrapper>
      <AnalyticsChartHeader
        assetId={detail?.assetId}
        symbol={detail?.metadata?.symbol}
        range={range}
        setRange={setRange}
      />

      <AnalyticsChartBody
        data={rangeData}
        decimals={detail?.metadata?.decimals}
        amountHidden={amountHidden}
        countHidden={countHidden}
        holdersHidden={holdersHidden}
      />

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
