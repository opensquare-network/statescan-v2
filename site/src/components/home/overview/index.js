import { Panel } from "../../styled/panel";
import styled from "styled-components";
import OverviewItem from "./item";
import { FlexBetween } from "../../styled/flex";
import LineChart from "./chart/line";
import { useSelector } from "react-redux";
import { overviewSelector } from "../../../store/reducers/chainSlice";

const Wrapper = styled(Panel)`
  padding: 24px;
  margin-top: 40px;
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
            text={"1"}
          />
          <OverviewItem
            title="Transfers"
            icon="transfers.svg"
            link="/transfers"
            text={"2"}
          />
          <OverviewItem
            title="Assets"
            icon="asset.svg"
            link="/assets"
            text={"3"}
          />
          <OverviewItem title="Holders" icon="holder.svg" text={"4"} />
          <OverviewItem
            title="NFT Class"
            icon="nft-class.svg"
            text={"5"}
            textSec={"6"}
            link="/nft"
            tip="Recognized / All"
          />
          <OverviewItem
            title="NFT Instance"
            icon="nft-class.svg"
            text={"7"}
            textSec={"8"}
            tip="Recognized / All"
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
