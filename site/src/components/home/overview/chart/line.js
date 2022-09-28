import { Axis, Chart, LineAdvance, Tooltip } from "bizcharts";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Inter_12_500 } from "../../../../styles/text";
import { Flex } from "../../../styled/flex";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  svg,
  img {
    margin-top: 17px;
  }
`;

const Title = styled.h2`
  margin: 0;
  ${Inter_12_500};
  text-align: right;
  color: ${(props) => props.theme.fontPrimary};
  font-weight: normal;
  line-height: 16px;
`;

const ChartWrapper = styled.div`
  margin-top: 4px;
  flex-grow: 1;
`;

const NoData = styled(Flex)`
  height: 100%;
`;

export default function LineChart({
  token = "",
  data = [],
  color = "#F22279",
}) {
  const targetRef = useRef();
  const [chartWidth, setChartWidth] = useState(0);
  const scale = {
    time: {
      tickCount: 3,
      formatter: (text) => moment(text).format("MMM DD"),
    },
    price: {
      tickCount: 3,
    },
  };

  useEffect(() => {
    if (targetRef.current) {
      setChartWidth(targetRef.current.offsetWidth);
    }
  }, [targetRef?.current?.offsetWidth]);

  return (
    <Wrapper ref={targetRef}>
      <Title>{token} Price History(USDT) · Last 30d</Title>
      <ChartWrapper>
        {data.length ? (
          <Chart
            data={data}
            scale={scale}
            height={100}
            width={chartWidth}
            padding={[2, 0, 20, 30]}
          >
            <Axis name="time" visible={true} tickLine={null} line={null} />
            <Axis name="price" visible={true} grid={null} />
            <LineAdvance
              shape="smooth"
              area
              position="time*price"
              color={color}
            />
            <Tooltip custom={true} containerTpl={`<i></i>`} />
          </Chart>
        ) : (
          <NoData>
            <img src="/imgs/nochart.svg" alt="NoChartDataLoaded" />
          </NoData>
        )}
      </ChartWrapper>
    </Wrapper>
  );
}
