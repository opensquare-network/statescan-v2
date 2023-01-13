import "../config";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { Inter_12_500 } from "../../../styles/text";
import { FlexBetween, FlexColumn } from "../../styled/flex";
import { abbreviateBigNumber } from "@osn/common";
import { fromAssetUnit } from "../../../utils";
import { withLoading } from "../../../HOC/withLoading";
import Loading from "../../loadings/loading";

const Wrapper = styled(FlexColumn)`
  padding: 24px 0;
`;

const Label = styled.span`
  color: ${(p) => p.theme.fontSecondary};
  ${Inter_12_500};
`;

const ChartWrapper = styled.div`
  height: 240px;
`;

const datasetLineBase = {
  fill: false,
  tension: 0.3,
  pointHoverBorderWidth: 1,
  pointRadius: 0,
  pointHitRadius: 10,
  borderWidth: 2,
};

const mapLoadingState = (props) => {
  const { data = [] } = props ?? {};

  return {
    loadingStates: [!data?.length],
    loadingComponent: <Loading />,
  };
};

function AssetAnalyticsChartBody({
  data = [],
  decimals,
  amountHidden,
  countHidden,
  holdersHidden,
}) {
  const transferAmounts = data?.map((item) =>
    fromAssetUnit(item.transferAmount?.$numberDecimal ?? 0, decimals),
  );
  const transferCounts = data?.map((item) => item.transferCount);
  const holderCounts = data?.map((item) => item.holderCount);

  const chartLabels = data?.map((item) => item?.indexer?.blockTime);
  const chartDatasets = [
    {
      label: "Transfer Amount",
      data: transferAmounts,
      yAxisID: "y",
      borderColor: "#e6007a",
      pointBackgroundColor: "#e6007a",
      hidden: amountHidden,
      ...datasetLineBase,
    },
    {
      label: "Transfer Count",
      data: transferCounts,
      yAxisID: "y1",
      borderColor: "#52CC8A",
      pointBackgroundColor: "#52CC8A",
      hidden: countHidden,
      ...datasetLineBase,
    },
    {
      label: "Holders",
      data: holderCounts,
      yAxisID: "y1",
      borderColor: "#1FABE8",
      pointBackgroundColor: "#1FABE8",
      hidden: holdersHidden,
      ...datasetLineBase,
    },
  ];

  const chartData = {
    labels: chartLabels,
    datasets: chartDatasets,
  };
  const chartOptions = {
    type: "line",
    clip: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        id: "a",
        position: "left",
        type: "linear",
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          callback(value) {
            return abbreviateBigNumber(value);
          },
        },
        border: {
          display: false,
        },
      },
      y1: {
        id: "b",
        position: "right",
        type: "linear",
        beginAtZero: true,
        grid: {
          drawTicks: false,
        },
        border: {
          display: false,
        },
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
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <Wrapper gap={16}>
      <FlexBetween>
        <Label>Amount</Label>
        <Label>Transfer Counts</Label>
      </FlexBetween>

      <ChartWrapper>
        <Line data={chartData} options={chartOptions} />
      </ChartWrapper>
    </Wrapper>
  );
}

export default withLoading(mapLoadingState)(AssetAnalyticsChartBody);
