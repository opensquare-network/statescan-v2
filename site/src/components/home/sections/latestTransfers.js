import styled from "styled-components";
import { Flex, FlexBetween } from "../../styled/flex";
import {
  Inter_12_500,
  Inter_14_600,
  SF_Mono_12_500,
} from "../../../styles/text";
import { withLoading } from "../../../HOC/withLoading";
import Loading from "../../loadings/loading";
import { ReactComponent as Transfer } from "./transfer.svg";
import { ReactComponent as TransferRight } from "./transferRight.svg";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import { ReactComponent as TimerIcon } from "../../icons/timer.svg";
import { timeDuration } from "../../../utils/viewFuncs/time";
import { addressEllipsis } from "../../../utils/viewFuncs";
import Link from "../../styled/link";

const TransferIcon = styled(Transfer)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }

  linearGradient {
    stop:first-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }

    stop:last-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }
  }
`;

const TransferRightIcon = styled(TransferRight)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

const Rows = styled.ul`
  margin: 0;
  padding-left: 0;
  padding-top: 8px;
  max-width: 644px;
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
  console.log(transfers);
  return (
    <Rows>
      {transfers?.slice(0, 5).map((transfer, i) => (
        <Row key={i}>
          <FlexBetween>
            <Flex gap={16}>
              <TransferIcon />
              <div>
                <Link
                  to={`/extrinsic/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.extrinsicIndex}`}
                >
                  <ThemeText>
                    {transfer?.indexer?.blockHeight?.toLocaleString()}-
                    {transfer?.indexer?.extrinsicIndex}
                  </ThemeText>
                </Link>
                <Flex gap={8}>
                  {transfer.isFinalized ? <CheckIcon /> : <TimerIcon />}
                  <Time> {timeDuration(transfer?.indexer?.blockTime)} </Time>
                </Flex>
              </div>
            </Flex>

            <div>
              {/* FIXME: with symbol */}
              <Value>{transfer.balance.$numberDecimal}</Value>
              <Flex gap={16}>
                <Address>{addressEllipsis(transfer.from)}</Address>
                <TransferRightIcon />
                <Address>{addressEllipsis(transfer.to)}</Address>
              </Flex>
            </div>
          </FlexBetween>
        </Row>
      ))}
    </Rows>
  );
}

export default withLoading(mapLoadingState)(LatestTransfers);
