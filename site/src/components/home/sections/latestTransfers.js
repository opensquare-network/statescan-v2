import styled from "styled-components";
import { Flex, FlexBetween } from "../../styled/flex";
import {
  Inter_12_500,
  Inter_14_600,
  SF_Mono_12_500,
} from "../../../styles/text";
import { withLoading } from "../../../HOC/withLoading";
import Loading from "../../loadings/loading";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import { ReactComponent as TimerIcon } from "../../icons/timer.svg";
import { timeDuration } from "../../../utils/viewFuncs/time";
import { addressEllipsis, toPrecision } from "../../../utils/viewFuncs";
import Link, { ColoredMonoLinkSmall } from "../../styled/link";
import ValueDisplay from "../../../components/displayValue";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import { OnlyDesktop } from "../../screen/onlyDesktop";
import Tooltip from "../../tooltip";
import TransferIcon from "../../icons/transferIcon";
import TransferRightIcon from "../../icons/transferRight";

const Rows = styled.ul`
  margin: 0;
  padding-left: 0;
  padding-top: 8px;
  display: flex;
  flex-wrap: wrap;
`;

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

  > * {
    flex-basis: 100%;
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

const Value = styled.p`
  margin: 0;
  margin-bottom: 4px;
  ${Inter_14_600};
  text-align: right;
  color: ${(props) => props.theme.fontPrimary};
`;

const Time = styled.span`
  color: ${(props) => props.theme.fontTertiary};
  ${Inter_12_500};
`;

const Address = styled.span`
  color: ${(props) => props.theme.theme500};
  ${SF_Mono_12_500};
`;

const mapLoadingState = (props) => {
  const { transfers = [] } = props;

  return {
    loadingStates: [!transfers?.length],
    loadingComponent: <Loading />,
  };
};

function LatestTransfers({ transfers }) {
  const chainSetting = useSelector(chainSettingSelector);

  return (
    <Rows>
      {transfers?.slice(0, 5).map((transfer, i) => (
        <Row key={i}>
          <FlexBetween>
            <Flex gap={16}>
              <OnlyDesktop>
                <TransferIcon />
              </OnlyDesktop>
              <div>
                <Link
                  to={`/extrinsic/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.extrinsicIndex}`}
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
            </Flex>

            <div>
              <Value>
                <ValueDisplay
                  value={toPrecision(
                    transfer.balance.$numberDecimal,
                    chainSetting.decimals,
                  )}
                  symbol={chainSetting.symbol}
                />
              </Value>
              <Flex gap={16}>
                <OnlyDesktop>
                  <Tooltip tip={transfer.from}>
                    <ColoredMonoLinkSmall to={`/account/${transfer.from}`}>
                      {addressEllipsis(transfer.from)}
                    </ColoredMonoLinkSmall>
                  </Tooltip>
                  <TransferRightIcon />
                </OnlyDesktop>
                <Tooltip tip={transfer.from}>
                  <ColoredMonoLinkSmall to={`/account/${transfer.to}`}>
                    {addressEllipsis(transfer.to)}
                  </ColoredMonoLinkSmall>
                </Tooltip>
              </Flex>
            </div>
          </FlexBetween>
        </Row>
      ))}
    </Rows>
  );
}

export default withLoading(mapLoadingState)(LatestTransfers);
