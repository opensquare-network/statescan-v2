import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { withLoading } from "../../../HOC/withLoading";
import { latestBlocksSelector } from "../../../store/reducers/socketSlice";
import { mobileCss } from "../../../utils/mobileCss";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import BlockSquareIcon from "../../icons/blockSquareIcon";
import HolderSquareIcon from "../../icons/holderSquareIcon";
import NftClassSquareIcon from "../../icons/nftClassSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import Loading from "../../loadings/loading";
import { Flex } from "../../styled/flex";
import { StyledPanelTableWrapper } from "../../styled/panel";
import OverviewChart from "./chart";
import OverviewItem from "./item";

const Panel = styled(Flex)`
  margin: 24px;
  justify-content: space-between;

  ${mobileCss(css`
    display: block;
  `)}
`;

const OverviewItemsWrapper = styled.div`
  --gap: 32px;
  --cols: 3;
  --gaps: calc(var(--gap) * calc(var(--cols) - 1));
  flex: 1;
  display: grid;
  gap: var(--gap);
  flex-wrap: wrap;
  grid-template-columns: repeat(
    var(--cols),
    calc((100% - var(--gaps)) / var(--cols))
  );

  ${mobileCss(css`
    --cols: 2;
  `)}
`;

const OverviewChartWrapper = styled.div`
  width: 464px;

  ${mobileCss(css`
    width: 100%;
    margin-top: 40px;
  `)}
`;

const mapLoadingState = (_props) => {
  return {
    loadingStates: [],
    loadingComponent: <Loading />,
  };
};

function Overview() {
  const blocks = useSelector(latestBlocksSelector);
  const blockHeight = useMemo(() => blocks[0]?.height ?? 0, [blocks]);

  return (
    <StyledPanelTableWrapper>
      <Panel>
        <OverviewItemsWrapper>
          <OverviewItem
            icon={<BlockSquareIcon />}
            label="Blocks"
            to="/blocks"
            value={blockHeight?.toLocaleString()}
          />
          <OverviewItem
            icon={<TransferSquareIcon />}
            label="Transfers"
            to="/transfers"
            value={233333}
          />
          <OverviewItem
            icon={<AssetSquareIcon />}
            label="Assets"
            to="/assets"
            value={17}
          />
          <OverviewItem
            icon={<HolderSquareIcon />}
            label="Holders"
            value={14444}
          />
          <OverviewItem
            icon={<NftClassSquareIcon />}
            label="NFT Class"
            to="/nft"
            value={3}
            total={33}
            tip="Recognized / All"
          />
          <OverviewItem
            icon={<NftClassSquareIcon />}
            label="NFT Instance"
            value={4}
            total={5}
            tip="Recognized / All"
          />
        </OverviewItemsWrapper>

        <OverviewChartWrapper>
          <OverviewChart />
        </OverviewChartWrapper>
      </Panel>
    </StyledPanelTableWrapper>
  );
}

export default withLoading(mapLoadingState)(Overview);
