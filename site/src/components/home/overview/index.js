import { Panel } from "../../styled/panel";
import styled from "styled-components";
import OverviewItem from "./item";
import { FlexBetween } from "../../styled/flex";
import LineChart from "./chart/line";
import { useSelector } from "react-redux";
import { overviewSelector } from "../../../store/reducers/chainSlice";

const Wrapper = styled(Panel)`
  padding: 24px;
`;

const ItemWrapper = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  row-gap: 32px;
`;

const ChartWrapper = styled.div`
  width: 367px;
  height: 120px;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

export default function Overview() {
  const pushedOverview = useSelector(overviewSelector);
  // console.log(pushedOverview);

  return (
    <Wrapper>
      <FlexBetween>
        <ItemWrapper>
          <OverviewItem
            title="Block Height"
            icon="blocks.svg"
            link="/blocks"
            text={123123}
          />
        </ItemWrapper>
        <ChartWrapper>
          <LineChart
            TOKEN="DOT"
            data={[
              {
                time: 1663200000000,
                price: 47.18672016752016,
              },
              {
                time: 1663113600000,
                price: 46.432823316608214,
              },
              {
                time: 1663027200000,
                price: 51.184170380583666,
              },
            ]}
          />
        </ChartWrapper>
      </FlexBetween>
    </Wrapper>
  );
}
