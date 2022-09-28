import { FlexBetween } from "../../styled/flex";
import LatestBlocks from "./latestBlocks";
import React from "react";
import styled from "styled-components";
import { Inter_14_500, Inter_18_700 } from "../../../styles/text";
import Link from "../../styled/link";
import { Panel } from "../../styled/panel";
import { useSelector } from "react-redux";
import { latestBlocksSelector } from "../../../store/reducers/socketSlice";

const Title = styled.h2`
  ${Inter_18_700};
  color: ${(props) => props.theme.fontPrimary};
`;

const Anchor = styled(Link)`
  display: block;
  padding-right: 24px;
  ${Inter_14_500};
  line-height: 52px;
  text-align: right;
  color: ${(props) => props.theme.theme500};
`;

const StyledPanel = styled(Panel)`
  max-width: 644px;
`;

export default function Sections() {
  const blocks = useSelector(latestBlocksSelector);

  return (
    <FlexBetween>
      <div>
        <Title>Latest Blocks</Title>
        <StyledPanel>
          <LatestBlocks blocks={blocks} />
          <Anchor to={"/blocks"}>View All</Anchor>
        </StyledPanel>
      </div>
    </FlexBetween>
  );
}
