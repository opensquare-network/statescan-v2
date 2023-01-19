import { toPrecision } from "@osn/common";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { withLoading } from "../../../HOC/withLoading";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import { overviewSelector } from "../../../store/reducers/socketSlice";
import { currencify } from "../../../utils";
import { lgcss, smcss } from "../../../styles/responsive";
import { mobilecss } from "../../../styles/responsive";
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
import ValueDisplay from "../../displayValue";
import Tooltip from "../../tooltip";
import NftSquareIcon from "../../icons/nftSquareIcon";
import KusamaParaIdSquareIcon from "../../icons/kusamaParaIdSquareIcon";

const Panel = styled(Flex)`
  margin: 24px;
  justify-content: space-between;

  ${mobilecss(css`
    display: block;
  `)}
`;

const OverviewItemsWrapper = styled.div`
  --gap-y: 32px;
  --cols: 5;
  flex: 1;
  display: grid;
  gap: var(--gap-y) 0;
  flex-wrap: wrap;
  grid-template-columns: repeat(var(--cols), calc(100% / var(--cols)));

  ${lgcss(css`
    --cols: 3;
  `)}

  ${smcss(css`
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
  const chainSetting = useSelector(chainSettingSelector);

  function issuancePrecision(issuance) {
    return toPrecision(issuance ?? 0, chainSetting.decimals);
  }

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
            label={`Total Issuance (${chainSetting.symbol})`}
            value={
              <Tooltip
                tip={currencify(
                  Number(issuancePrecision(overview.totalIssuance)),
                )}
              >
                <ValueDisplay
                  value={issuancePrecision(overview.totalIssuance)}
                />
              </Tooltip>
            }
          />
          {chainSetting.kusamaParaId && (
            <OverviewItem
              icon={<KusamaParaIdSquareIcon />}
              label="Kusama Para ID"
              value={currencify(chainSetting.kusamaParaId)}
            />
          )}
          <OverviewItem
            icon={<HolderSquareIcon />}
            label="Accounts"
            value={currencify(overview.accounts)}
          />
          <OverviewItem
            icon={<AssetSquareIcon />}
            label="Assets"
            value={currencify(overview.assets)}
          />
          <OverviewItem
            icon={<NftSquareIcon />}
            label="NFT Classes"
            tip="Recongized / All"
            value={currencify(overview.nftClasses?.valid)}
            total={currencify(overview.nftClasses?.total)}
          />
          <OverviewItem
            icon={<NftSquareIcon />}
            label="NFT Instances"
            tip="Recongized / All"
            value={currencify(overview.nftInstances?.valid)}
            total={currencify(overview.nftInstances?.total)}
          />
        </OverviewItemsWrapper>
      </Panel>
    </StyledPanelTableWrapper>
  );
}

export default withLoading(mapLoadingState)(Overview);
