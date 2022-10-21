import { Flex, FlexBetween, FlexEnd } from "../../styled/flex";
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
  const { blocks } = props;
  return {
    loadingStates: [blocks?.length === 0],
    loadingComponent: <Loading />,
  };
};

function LatestBlocks({ blocks }) {
  const chainSetting = useSelector(chainSettingSelector);

  return (
    <Rows>
      {blocks.slice(0, 5).map((block, i) => (
        <Row key={i}>
          <FlexBetween>
            <Flex gap={16}>
              <PC>
                <BlockSquareIcon />
              </PC>
              <div>
                <Link to={`/block/${block.height}`}>
                  <BlockHeight>{block.height?.toLocaleString?.()}</BlockHeight>
                </Link>
                <Flex gap={8}>
                  <FinalizedState finalized={block?.isFinalized} />
                  <Time> {timeDuration(block.time)} </Time>
                </Flex>
              </div>
            </Flex>

            <div>
              <Tooltip tip={block.validator} pullRight>
                <AddressOrIdentity
                  address={block?.validator}
                  network={chainSetting.value}
                  maxWidth={93}
                />
              </Tooltip>
              <FlexEnd style={{ fontSize: 12, marginTop: 4 }} gap={8}>
                <Flex gap={8}>
                  <Label>Extrinsics</Label>
                  <Link to={`/block/${block.height}?tab=extrinsics`}>
                    <Bold>{block.extrinsicsCount}</Bold>
                  </Link>
                </Flex>
                <Flex gap={8}>
                  <Label>Events</Label>
                  <Link to={`/block/${block.height}?tab=events`}>
                    <Bold>{block.eventsCount}</Bold>
                  </Link>
                </Flex>
              </FlexEnd>
            </div>
          </FlexBetween>
        </Row>
      ))}
    </Rows>
  );
}

export default withLoading(mapLoadingState)(LatestBlocks);
