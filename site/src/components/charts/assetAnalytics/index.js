import moment from "moment";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { ASSET_ANALYTICS_RANGE } from "../../../utils/constants";
import { Panel } from "../../styled/panel";
import AssetAnalyticsChartBody from "./body";
import AssetAnalyticsChartFooter from "./footer";
import AssetAnalyticsChartHeader from "./header";
import { useQuery } from "@apollo/client";
import { ASSET_ANALYTICS } from "../../../services/gql/assets";

const Wrapper = styled(Panel)`
  padding: 8px 24px;
`;

export default function AssetAnalyticsChart({ assetId, asset }) {
  const [range, setRange] = useState(ASSET_ANALYTICS_RANGE.ALL);
  const [amountHidden, setAmountHidden] = useState(false);
  const [countHidden, setCountHidden] = useState(false);
  const [holdersHidden, setHoldersHidden] = useState(false);

  const { data } = useQuery(ASSET_ANALYTICS, {
    variables: {
      assetId: parseInt(assetId),
    },
  });

  const rangeData = useMemo(() => {
    const rangeDateMap = {
      [ASSET_ANALYTICS_RANGE.ONE_MONTH]: "months",
      [ASSET_ANALYTICS_RANGE.ONE_YEAR]: "years",
    };

    if (range === ASSET_ANALYTICS_RANGE.ALL) {
      return data?.assetHistoryStatistics;
    } else {
      const ts = moment().subtract(1, rangeDateMap[range]).valueOf();
      return data?.assetHistoryStatistics.filter(
        (item) => item?.indexer?.blockTime > ts,
      );
    }
  }, [range, data?.assetHistoryStatistics]);

  return (
    <Wrapper>
      <AssetAnalyticsChartHeader
        assetId={asset?.assetId}
        assetHeight={asset?.assetHeight}
        symbol={asset?.metadata?.symbol}
        range={range}
        setRange={setRange}
      />

      <AssetAnalyticsChartBody
        data={rangeData}
        decimals={asset?.metadata?.decimals}
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
