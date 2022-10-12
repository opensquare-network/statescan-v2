import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { withLoading } from "../../../HOC/withLoading";
import { latestBlocksSelector } from "../../../store/reducers/socketSlice";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import BlockSquareIcon from "../../icons/blockSquareIcon";
import HolderSquareIcon from "../../icons/holderSquareIcon";
import NftClassSquareIcon from "../../icons/nftClassSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import Loading from "../../loadings/loading";
import { Flex } from "../../styled/flex";
import { StyledPanelTableWrapper } from "../../styled/panel";
import DataPanelChart from "./chart";
import DataPanelItem from "./item";

const Panel = styled(Flex)`
  margin: 24px;
`;

const DataPanelItemsWrapper = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  row-gap: 32px;
`;

const DataPanelChartWrapper = styled.div`
  width: 464px;
`;

const mapLoadingState = (_props) => {
  return {
    loadingStates: [],
    loadingComponent: <Loading />,
  };
};

function DataPanel() {
  const blocks = useSelector(latestBlocksSelector);
  const blockHeight = useMemo(() => blocks[0]?.height ?? 0, [blocks]);

  return (
    <StyledPanelTableWrapper>
      <Panel>
        <DataPanelItemsWrapper>
          <DataPanelItem
            icon={<BlockSquareIcon />}
            label="Blocks"
            to="/blocks"
            value={blockHeight?.toLocaleString()}
          />
          <DataPanelItem
            icon={<TransferSquareIcon />}
            label="Transfers"
            to="/transfers"
            value={233333}
          />
          <DataPanelItem
            icon={<AssetSquareIcon />}
            label="Assets"
            to="/assets"
            value={17}
          />
          <DataPanelItem
            icon={<HolderSquareIcon />}
            label="Holders"
            value={14444}
          />
          <DataPanelItem
            icon={<NftClassSquareIcon />}
            label="NFT Class"
            to="/nft"
            value={3}
            total={33}
          />
          <DataPanelItem
            icon={<NftClassSquareIcon />}
            label="NFT Instance"
            value={4}
            total={5}
          />
        </DataPanelItemsWrapper>

        <DataPanelChartWrapper>
          <DataPanelChart />
        </DataPanelChartWrapper>
      </Panel>
    </StyledPanelTableWrapper>
  );
}

export default withLoading(mapLoadingState)(DataPanel);
