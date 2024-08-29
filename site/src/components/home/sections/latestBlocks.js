import { Flex, FlexEnd } from "../../styled/flex";
import styled from "styled-components";
import { Inter_12_500, Inter_14_600 } from "../../../styles/text";
import React from "react";
import { timeDuration } from "../../../utils/viewFuncs/time";
import Link from "../../styled/link";
import Tooltip from "../../tooltip";
import BlockSquareIcon from "../../icons/blockSquareIcon";
import FinalizedState from "../../states/finalizedState";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import AddressOrIdentity from "../../address";
import { latestBlocksLoadingSelector } from "../../../store/reducers/socketSlice";
import LatestList from "./latestList";

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

function LatestBlocks({ blocks }) {
  const chainSetting = useSelector(chainSettingSelector);
  const blocksLoading = useSelector(latestBlocksLoadingSelector);

  const listItems = blocks?.slice(0, 5)?.map((block) => {
    return {
      icon: <BlockSquareIcon />,
      left: (
        <div>
          <Link to={`/blocks/${block.height}`}>
            <BlockHeight>{block.height?.toLocaleString?.()}</BlockHeight>
          </Link>
          <Flex gap={8}>
            <FinalizedState height={block?.height} />
            <Time>{timeDuration(block.time)}</Time>
          </Flex>
        </div>
      ),
      right: (
        <>
          <Tooltip tip={block.validator} pullRight>
            <AddressOrIdentity
              key={block?.validator}
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
        </>
      ),
    };
  });

  return (
    <LatestList
      items={listItems}
      loading={blocksLoading}
      noDataText="No blocks"
    />
  );
}

export default LatestBlocks;
