import styled from "styled-components";
import { Flex } from "../../styled/flex";
import {
  Inter_12_500,
  Inter_14_600,
  Overpass_Mono_12_500,
} from "../../../styles/text";
import { withLoading } from "../../../HOC/withLoading";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import { ReactComponent as TimerIcon } from "../../icons/timer.svg";
import { timeDuration } from "../../../utils/viewFuncs/time";
import { toPrecision } from "@osn/common";
import Link from "../../styled/link";
import ValueDisplay from "../../../components/displayValue";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import TooltipOrigin from "../../tooltip";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import TransferRightSquareIcon from "../../icons/transferRightSquareIcon";
import AddressOrIdentity from "../../address";
import React from "react";
import { PC } from "../../styled/responsive";
import getTransferSymbol from "../../../utils/viewFuncs/transferSymbol";
import {
  flex,
  gap_x,
  items_center,
  justify_end,
  max_w_full,
  truncate,
} from "../../../styles/tailwindcss";
import NoDataOrigin from "../../noData";
import { latestSignedTransfersLoadingSelector } from "../../../store/reducers/socketSlice";

const heightcss = `height: calc(100% - 52px)`;

const Rows = styled.ul`
  margin: 0;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  ${heightcss};
`;

const RowLeftFlex = styled(Flex)``;
const RowRight = styled.div``;

const Row = styled.li`
  all: unset;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  line-height: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.strokeBase};

  ${RowLeftFlex},
  ${RowRight} {
    flex: 1;
    max-width: 50%;
  }
`;

const ThemeText = styled.p`
  margin: 0;
  color: ${(p) => p.theme.theme500};
  ${Inter_14_600};
`;

const BlockHeight = styled(ThemeText)`
  margin-bottom: 4px;
`;

const Value = styled.div`
  margin-bottom: 4px;
  ${Inter_14_600};
  text-align: right;
  color: ${(props) => props.theme.fontPrimary};
`;

const Time = styled.span`
  color: ${(props) => props.theme.fontTertiary};
  ${Inter_12_500};
`;

const TransferAddressWrapper = styled.div`
  ${flex};
  ${items_center};
  ${justify_end};
  ${gap_x(8)};
  ${max_w_full};

  a,
  a span {
    ${Overpass_Mono_12_500};
  }
`;

const Tooltip = styled(TooltipOrigin)`
  ${(p) => p.truncate && truncate};
`;

const NoData = styled(NoDataOrigin)`
  ${heightcss};
`;

const mapLoadingState = (props) => {
  const { loading } = props;

  return {
    loadingStates: loading,
  };
};

function LatestTransfers({ transfers }) {
  const chainSetting = useSelector(chainSettingSelector);
  const transfersLoading = useSelector(latestSignedTransfersLoadingSelector);

  if (!transfers?.length && !transfersLoading) {
    return <NoData text="No transfers" />;
  }

  return (
    <Rows>
      {transfers?.slice(0, 5).map((transfer, i) => {
        let valueDisplaySymbol = getTransferSymbol(
          transfer,
          chainSetting.symbol,
        );

        if (chainSetting.modules?.assets && transfer.assetId) {
          valueDisplaySymbol = (
            <Link to={`/assets/${transfer.assetId}`}>{valueDisplaySymbol}</Link>
          );
        }

        return (
          <Row key={i}>
            <RowLeftFlex gap={16}>
              <PC>
                <TransferSquareIcon />
              </PC>
              <div>
                <Link
                  to={`/extrinsics/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.extrinsicIndex}`}
                >
                  <BlockHeight>
                    {transfer?.indexer?.blockHeight?.toLocaleString()}-
                    {transfer?.indexer?.extrinsicIndex}
                  </BlockHeight>
                </Link>
                <Flex gap={8}>
                  {transfer.isFinalized ? <CheckIcon /> : <TimerIcon />}
                  <Time> {timeDuration(transfer?.indexer?.blockTime)} </Time>
                </Flex>
              </div>
            </RowLeftFlex>

            <RowRight>
              <Value>
                <ValueDisplay
                  value={toPrecision(
                    transfer.balance,
                    transfer.decimals || chainSetting.decimals,
                  )}
                  symbol={valueDisplaySymbol}
                  showNotEqualTooltip
                />
              </Value>
              <TransferAddressWrapper>
                <PC>
                  <Tooltip
                    tip={transfer.from}
                    pullRight
                    style={{ marginLeft: 0 }}
                  >
                    <AddressOrIdentity
                      address={transfer?.from}
                      network={chainSetting.value}
                    />
                  </Tooltip>
                  <div>
                    <TransferRightSquareIcon />
                  </div>
                </PC>
                <Tooltip
                  tip={transfer.to}
                  pullRight
                  style={{ marginLeft: 0 }}
                  truncate
                >
                  <AddressOrIdentity
                    address={transfer?.to}
                    network={chainSetting.value}
                  />
                </Tooltip>
              </TransferAddressWrapper>
            </RowRight>
          </Row>
        );
      })}
    </Rows>
  );
}

export default withLoading(mapLoadingState)(LatestTransfers);
