import { Flex, FlexEnd } from "../../styled/flex";
import styled from "styled-components";
import { Inter_12_500, Inter_14_600 } from "../../../styles/text";
import { withLoading } from "../../../HOC/withLoading";
import React from "react";
import { timeDuration } from "../../../utils/viewFuncs/time";
import Link from "../../styled/link";
import Loading from "../../loadings/loading";
import Tooltip from "../../tooltip";
import BlockSquareIcon from "../../icons/blockSquareIcon";
import FinalizedState from "../../states/finalizedState";
import { PC } from "../../styled/responsive";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import AddressOrIdentity from "../../address";

const Rows = styled.ul`
  margin: 0;
  padding-left: 0;
  padding-top: 8px;
  display: flex;
  flex-wrap: wrap;
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

const Time = styled.span`
  color: ${(props) => props.theme.fontTertiary};
  ${Inter_12_500};
`;

const Bold = styled.span`
  ${Inter_12_500};
  color: ${(props) => props.theme.fontPrimary};

  &:hover {
    color: ${(props) => props.theme.theme500};
    text-decoration: underline;
  }
`;

const Label = styled.span`
  color: ${(props) => props.theme.fontTertiary};
`;

const mapLoadingState = (props) => {
  const { loading } = props;
  return {
    loadingStates: loading,
    loadingComponent: <Loading />,
  };
};

function LatestBlocks({ blocks }) {
  const chainSetting = useSelector(chainSettingSelector);

  return (
    <Rows>
      {blocks.slice(0, 5).map((block, i) => (
        <Row key={i}>
          <RowLeftFlex gap={16}>
            <PC>
              <BlockSquareIcon />
            </PC>
            <div>
              <Link to={`/blocks/${block.height}`}>
                <BlockHeight>{block.height?.toLocaleString?.()}</BlockHeight>
              </Link>
              <Flex gap={8}>
                <FinalizedState finalized={block?.isFinalized} />
                <Time> {timeDuration(block.time)} </Time>
              </Flex>
            </div>
          </RowLeftFlex>

          <RowRight>
            <Tooltip tip={block.validator} pullRight>
              <AddressOrIdentity
                address={block?.validator}
                network={chainSetting.value}
              />
            </Tooltip>
            <FlexEnd style={{ fontSize: 12, marginTop: 4 }} gap={8}>
              <Flex gap={8}>
                <Label>Extrinsics</Label>
                <Link to={`/blocks/${block.height}?tab=extrinsics`}>
                  <Bold>{block.extrinsicsCount}</Bold>
                </Link>
              </Flex>
              <Flex gap={8}>
                <Label>Events</Label>
                <Link to={`/blocks/${block.height}?tab=events`}>
                  <Bold>{block.eventsCount}</Bold>
                </Link>
              </Flex>
            </FlexEnd>
          </RowRight>
        </Row>
      ))}
    </Rows>
  );
}

export default withLoading(mapLoadingState)(LatestBlocks);
