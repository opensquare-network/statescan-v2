import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import api from "../../../services/api";
import {
  assetAnalyticsSelector,
  assetDetailSelector,
  setAnalytics,
} from "../../../store/reducers/assetSlice";
import { ASSET_ANALYTICS_RANGE } from "../../../utils/constants";
import { Panel } from "../../styled/panel";
import AssetAnalyticsChartBody from "./body";
import AssetAnalyticsChartFooter from "./footer";
import AssetAnalyticsChartHeader from "./header";

const Wrapper = styled(Panel)`
  padding: 8px 24px;
`;

export default function AssetAnalyticsChart({ url }) {
  const dispatch = useDispatch();
  const [range, setRange] = useState(ASSET_ANALYTICS_RANGE.ALL);
  const detail = useSelector(assetDetailSelector);
  const analytics = useSelector(assetAnalyticsSelector);
  const [amountHidden, setAmountHidden] = useState(false);
  const [countHidden, setCountHidden] = useState(false);
  const [holdersHidden, setHoldersHidden] = useState(false);

  const rangeData = useMemo(() => {
    const rangeDateMap = {
      [ASSET_ANALYTICS_RANGE.ONE_MONTH]: "months",
      [ASSET_ANALYTICS_RANGE.ONE_YEAR]: "years",
    };

    if (range === ASSET_ANALYTICS_RANGE.ALL) {
      return analytics;
    } else {
      const ts = moment().subtract(1, rangeDateMap[range]).valueOf();
      return analytics.filter((item) => item?.indexer?.blockTime > ts);
    }
  }, [range, analytics]);

  useEffect(() => {
    if (!url || analytics?.length) {
      return;
    }

    api.fetch(url).then(({ result }) => {
      if (result) {
        dispatch(setAnalytics(result));
      }
    });
  }, [dispatch, url, analytics?.length]);

  return (
    <Wrapper>
      <AssetAnalyticsChartHeader
        assetId={detail?.assetId}
        assetHeight={detail?.assetHeight}
        symbol={detail?.metadata?.symbol}
        range={range}
        setRange={setRange}
      />

      <AssetAnalyticsChartBody
        data={rangeData}
        decimals={detail?.metadata?.decimals}
        amountHidden={amountHidden}
        countHidden={countHidden}
        holdersHidden={holdersHidden}
      />

      <AssetAnalyticsChartFooter
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
