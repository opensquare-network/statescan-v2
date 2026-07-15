import "../charts/config";
import moment from "moment";
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import styled, { css } from "styled-components";
import { abbreviateBigNumber } from "@osn/common";
import {
  ASSET_ANALYTICS_RANGE,
  ASSET_ANALYTICS_RANGE_ITEMS,
} from "../../utils/constants";
import { fromAssetUnit } from "../../utils";
import { toLidoTimestamp } from "../../utils/viewFuncs/lido";
import { Inter_12_500, Inter_12_600, Inter_14_600 } from "../../styles/text";
import { useLidoDailyStatsAnalyticsData } from "../../hooks/lido/useLidoDailyStatsData";
import { withLoading } from "../../HOC/withLoading";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { Panel } from "../styled/panel";
import { Flex, FlexBetween, FlexCenter, FlexColumn } from "../styled/flex";
import Loading from "../loadings/loading";

const Wrapper = styled(Panel)`
  padding: 8px 24px;
`;

const Header = styled(FlexBetween)`
  padding: 14px 0;
`;

const RangeItem = styled.div`
  padding: 2px 6px;
  background: ${(p) => p.theme.fillSub};
  color: ${(p) => p.theme.fontSecondary};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  text-transform: capitalize;
  ${Inter_12_600};

  ${(p) =>
    p.active &&
    css`
      background: ${(p) => p.theme.theme100};
      color: ${(p) => p.theme.theme500};
    `}
`;

const Symbol = styled.span`
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
`;

const Body = styled(FlexColumn)`
  padding: 24px 0;
`;

const Label = styled.span`
  color: ${(p) => p.theme.fontSecondary};
  ${Inter_12_500};
`;

const ChartWrapper = styled.div`
  height: 240px;
`;

const Footer = styled(FlexCenter)`
  padding: 8px 0;
  flex-wrap: wrap;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 2px;
    background: ${(p) => p.color};
  }

  &::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 9999px;
    background: ${(p) => p.color};
  }
`;

const LegendItem = styled(Flex)`
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

const datasetLineBase = {
  fill: false,
  spanGaps: true,
  tension: 0.3,
  pointHoverBorderWidth: 1,
  pointRadius: 0,
  pointHitRadius: 10,
  borderWidth: 2,
};

const rangeDateMap = {
  [ASSET_ANALYTICS_RANGE.ONE_MONTH]: "months",
  [ASSET_ANALYTICS_RANGE.ONE_YEAR]: "years",
};

function getLatestTimestamp(data = []) {
  return data.reduce((result, item) => {
    return Math.max(result, toLidoTimestamp(item?.timestamp));
  }, 0);
}

function filterStatsByRange(items = [], startTimestamp) {
  if (!startTimestamp) {
    return items;
  }

  return items.filter(
    (item) => toLidoTimestamp(item?.timestamp) > startTimestamp,
  );
}

function getChartData(data = [], range) {
  if (range === ASSET_ANALYTICS_RANGE.ALL) {
    return data;
  }

  const latestTimestamp = getLatestTimestamp(data);

  if (!latestTimestamp) {
    return data;
  }

  const startTimestamp = moment(latestTimestamp)
    .subtract(1, rangeDateMap[range])
    .valueOf();

  return filterStatsByRange(data, startTimestamp);
}

function toSupplyValue(value, decimals) {
  if (value == null) {
    return null;
  }

  return fromAssetUnit(value, decimals);
}

const mapLoadingState = (props) => {
  const { loading } = props ?? {};

  return {
    loadingStates: [loading],
    loadingComponent: <Loading />,
  };
};

function LidoTokenAnalyticsChartBody({
  data = [],
  decimals,
  supplyHidden,
  holdersHidden,
}) {
  const pointRadius = data.length <= 1 ? 3 : 0;
  const chartLabels = data.map((item) => toLidoTimestamp(item.timestamp));
  const totalSupply = data.map((item) =>
    toSupplyValue(item.totalSupply, decimals),
  );
  const holders = data.map((item) => item.holders ?? null);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Supply",
        data: totalSupply,
        yAxisID: "y",
        borderColor: "#e6007a",
        pointBackgroundColor: "#e6007a",
        hidden: supplyHidden,
        ...datasetLineBase,
        pointRadius,
      },
      {
        label: "Holders",
        data: holders,
        yAxisID: "y1",
        borderColor: "#1FABE8",
        pointBackgroundColor: "#1FABE8",
        hidden: holdersHidden,
        ...datasetLineBase,
        pointRadius,
      },
    ],
  };
  const chartOptions = {
    type: "line",
    clip: false,
    animation: {
      duration: 200,
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        position: "left",
        type: "linear",
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          callback(value) {
            return abbreviateBigNumber(value);
          },
        },
        border: { display: false },
      },
      y1: {
        position: "right",
        type: "linear",
        beginAtZero: true,
        grid: { drawTicks: false },
        border: { display: false },
      },
      x: {
        type: "time",
        time: {
          displayFormats: {
            day: "MMM, DD",
          },
          unit: "day",
          unitStepSize: 2,
        },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        filter(item) {
          return item.raw != null;
        },
        callbacks: {
          title(items) {
            return moment(items[0]?.parsed?.x).format("MMM D, YYYY");
          },
          label(item) {
            return `${item.dataset.label}: ${item.formattedValue}`;
          },
        },
      },
    },
  };

  return (
    <Body gap={16}>
      <FlexBetween>
        <Label>Total Supply</Label>
        <Label>Holders</Label>
      </FlexBetween>
      <ChartWrapper>
        <Line data={chartData} options={chartOptions} />
      </ChartWrapper>
    </Body>
  );
}

const LoadableLidoTokenAnalyticsChartBody = withLoading(mapLoadingState)(
  LidoTokenAnalyticsChartBody,
);

export default function LidoTokenAnalyticsChart({ token }) {
  const { decimals } = useChainSettings();
  const [range, setRange] = useState(ASSET_ANALYTICS_RANGE.ALL);
  const [supplyHidden, setSupplyHidden] = useState(false);
  const [holdersHidden, setHoldersHidden] = useState(false);
  const { data, loading } = useLidoDailyStatsAnalyticsData(token);

  const rangeData = useMemo(() => getChartData(data, range), [data, range]);

  return (
    <Wrapper>
      <Header>
        <Symbol>{token}</Symbol>
        <Flex gap={8}>
          {ASSET_ANALYTICS_RANGE_ITEMS.map((item) => (
            <RangeItem
              role="button"
              key={item}
              active={range === item}
              onClick={() => setRange(item)}
            >
              {item}
            </RangeItem>
          ))}
        </Flex>
      </Header>

      <LoadableLidoTokenAnalyticsChartBody
        data={rangeData}
        decimals={decimals}
        supplyHidden={supplyHidden}
        holdersHidden={holdersHidden}
        loading={loading}
      />

      <Footer gap={24}>
        <LegendItem
          gap={4}
          hidden={supplyHidden}
          onClick={() => setSupplyHidden(!supplyHidden)}
        >
          <Icon color="#e6007a" />
          <span>Total Supply</span>
        </LegendItem>
        <LegendItem
          hidden={holdersHidden}
          onClick={() => setHoldersHidden(!holdersHidden)}
        >
          <Icon color="#1FABE8" />
          <span>Holders</span>
        </LegendItem>
      </Footer>
    </Wrapper>
  );
}
