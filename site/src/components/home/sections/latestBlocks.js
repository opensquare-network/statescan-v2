import { Flex, FlexBetween } from "../../styled/flex";
import { Panel } from "../../styled/panel";
import styled from "styled-components";
import {
  Inter_12_500,
  Inter_14_500,
  Inter_14_600,
  Inter_18_700,
  SF_Mono_14_500,
} from "../../../styles/text";
import { withLoading } from "../../../HOC/withLoading";
import React from "react";
import { timeDuration } from "../../../utils/viewFuncs/time";
import { ReactComponent as BlockIcon } from "./block.svg";
import { addressEllipsis } from "../../../utils/viewFuncs";
import Link from "../../styled/link";

const Title = styled.h2`
  ${Inter_18_700};
  color: ${(props) => props.theme.fontPrimary};
`;

const Rows = styled.ul`
  margin: 0;
  padding-left: 0;
  padding-top: 8px;
  max-width: 500px;
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
  color: #e6007a;
  ${Inter_14_600};
`;

const Time = styled.span`
  color: ${(props) => props.theme.fontTertiary};
  ${Inter_12_500};
`;

const Bold = styled.span`
  ${Inter_12_500};
  color: ${(props) => props.theme.fontPrimary};
`;

const Address = styled.p`
  margin: 0;
  ${SF_Mono_14_500};
  text-align: right;
  color: ${(props) => props.theme.fontPrimary};
`;

const Label = styled.span`
  color: ${(props) => props.theme.fontTertiary};
`;

const Anchor = styled(Link)`
  display: block;
  padding-right: 24px;
  ${Inter_14_500};
  line-height: 52px;
  text-align: right;
  color: #e6007a;
`;

const mapLoadingState = (props) => {
  const { blocks } = props;
  return [blocks?.length === 0];
};

function LatestBlocks({ blocks }) {
  return (
    <div>
      <Title>Latest Blocks</Title>
      <Panel>
        <Rows>
          {blocks.slice(0, 5).map((block, i) => (
            <Row key={i}>
              <FlexBetween>
                <Flex style={{ gap: 16 }}>
                  <BlockIcon />
                  <div>
                    <ThemeText>{block.height}</ThemeText>
                    <Time> {timeDuration(block.time)} </Time>
                  </div>
                </Flex>

                <div>
                  <Address>{addressEllipsis(block.validator)}</Address>
                  <Flex style={{ fontSize: 12, gap: 16 }}>
                    <Flex style={{ gap: 8 }}>
                      <Label>Extrinsics</Label>
                      <Bold>{block.extrinsicsCount}</Bold>
                    </Flex>
                    <Flex style={{ gap: 8 }}>
                      <Label>Events</Label>
                      <Bold>{block.eventsCount}</Bold>{" "}
                    </Flex>
                  </Flex>
                </div>
              </FlexBetween>
            </Row>
          ))}
        </Rows>
        <Anchor to={"/blocks"}>View All</Anchor>
      </Panel>
    </div>
  );
}

export default withLoading(mapLoadingState)(LatestBlocks);
