import styled from "styled-components";
import { withLoading } from "../../../HOC/withLoading";
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

const mapLoadingState = (_props) => {
  return {
    loadingStates: [],
    loadingComponent: <Loading />,
  };
};

function DataPanel() {
  return (
    <StyledPanelTableWrapper>
      <Panel>
        <DataPanelItemsWrapper>
          <DataPanelItem
            icon={<BlockSquareIcon />}
            label="Blocks"
            value={1157823}
          />
          <DataPanelItem
            icon={<TransferSquareIcon />}
            label="Transfers"
            value={223333}
          />
          <DataPanelItem
            icon={<AssetSquareIcon />}
            label="Assets"
            value={134}
          />
          <DataPanelItem
            icon={<HolderSquareIcon />}
            label="Holders"
            value={14444}
          />
          <DataPanelItem
            icon={<NftClassSquareIcon />}
            label="NFT Class"
            value={30}
            total="32"
          />
          <DataPanelItem
            icon={<NftClassSquareIcon />}
            label="NFT Instance"
            value={80}
            total="100"
          />
        </DataPanelItemsWrapper>
        <DataPanelChart />
      </Panel>
    </StyledPanelTableWrapper>
  );
}

export default withLoading(mapLoadingState)(DataPanel);
