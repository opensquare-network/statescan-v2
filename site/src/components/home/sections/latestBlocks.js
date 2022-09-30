import { Flex, FlexBetween } from "../../styled/flex";
import styled from "styled-components";
import {
  Inter_12_500,
  Inter_14_600,
  SF_Mono_14_500,
} from "../../../styles/text";
import { withLoading } from "../../../HOC/withLoading";
import React from "react";
import { timeDuration } from "../../../utils/viewFuncs/time";
import { ReactComponent as Block } from "./block.svg";
import { addressEllipsis } from "../../../utils/viewFuncs";
import Link from "../../styled/link";
import Loading from "../../loadings/loading";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import { ReactComponent as TimerIcon } from "../../icons/timer.svg";

const BlockIcon = styled(Block)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }

  #paint0_linear_5874_7536 {
    stop:first-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }

    stop:last-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }
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

const Address = styled.p`
  margin: 0;
  margin-bottom: 4px;
  ${SF_Mono_14_500};
  text-align: right;
  color: ${(props) => props.theme.fontPrimary};
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
  return (
    <Rows>
      {blocks.slice(0, 5).map((block, i) => (
        <Row key={i}>
          <FlexBetween>
            <Flex gap={16}>
              <BlockIcon />
              <div>
                <Link to={`/block/${block.height}`}>
                  <ThemeText>{block.height?.toLocaleString?.()}</ThemeText>
                </Link>
                <Flex gap={8}>
                  {block.isFinalized ? <CheckIcon /> : <TimerIcon />}
                  <Time> {timeDuration(block.time)} </Time>
                </Flex>
              </div>
            </Flex>

            <div>
              <Address>{addressEllipsis(block.validator)}</Address>
              <Flex style={{ fontSize: 12 }} gap={8}>
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
              </Flex>
            </div>
          </FlexBetween>
        </Row>
      ))}
    </Rows>
  );
}

export default withLoading(mapLoadingState)(LatestBlocks);
