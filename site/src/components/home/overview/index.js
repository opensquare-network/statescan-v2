import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { withLoading } from "../../../HOC/withLoading";
import { overviewSelector } from "../../../store/reducers/socketSlice";
import { currencify } from "../../../utils";
import { lgcss } from "../../../utils/breakpoints";
import { mobileCss } from "../../../utils/mobileCss";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import BlockSquareIcon from "../../icons/blockSquareIcon";
import ExtrinsicsSquareIcon from "../../icons/extrinsicsSquareIcon";
import FinalizedBlockSquareIcon from "../../icons/finalizedBlockSquareIcon";
import HolderSquareIcon from "../../icons/holderSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import Loading from "../../loadings/loading";
import { Flex } from "../../styled/flex";
import { StyledPanelTableWrapper } from "../../styled/panel";
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
  --cols: 6;
  --gaps: calc(var(--gap) * calc(var(--cols) - 1));
  flex: 1;
  display: grid;
  gap: var(--gap);
  flex-wrap: wrap;
  grid-template-columns: repeat(
    var(--cols),
    calc((100% - var(--gaps)) / var(--cols))
  );

  ${lgcss(css`
    --cols: 3;
  `)}

  ${mobileCss(css`
    --cols: 2;
  `)}
`;

const mapLoadingState = (_props) => {
  return {
    loadingStates: [],
    loadingComponent: <Loading />,
  };
};

function Overview() {
  const overview = useSelector(overviewSelector);

  return (
    <StyledPanelTableWrapper>
      <Panel>
        <OverviewItemsWrapper>
          <OverviewItem
            icon={<BlockSquareIcon />}
            label="Latest Blocks"
            value={currencify(overview.latestHeight)}
          />
          <OverviewItem
            icon={<FinalizedBlockSquareIcon />}
            label="Finalized Block"
            value={currencify(overview.finalizedHeight)}
          />
          <OverviewItem
            icon={<HolderSquareIcon />}
            label="Accounts"
            value={currencify(overview.accounts)}
          />
          <OverviewItem
            icon={<ExtrinsicsSquareIcon />}
            label="Signed Extrinsics"
            value={currencify(overview.signedExtrinsics)}
          />
          <OverviewItem
            icon={<TransferSquareIcon />}
            label="Transfers"
            value={currencify(overview.transfers)}
          />
          <OverviewItem
            icon={<AssetSquareIcon />}
            label="Total Issuance (LIT)"
            value={currencify(overview.totalIssuance)}
          />
        </OverviewItemsWrapper>
      </Panel>
    </StyledPanelTableWrapper>
  );
}

export default withLoading(mapLoadingState)(Overview);
