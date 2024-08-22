import styled from "styled-components";
import { FlexColumn } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";
import BlockTime from "./blockTime";
import BlockHeight from "./blockHeight";
import IndexerLinks from "./link";
import { MOBILE_SIZE } from "@osn/constants";

const Wrapper = styled(FlexColumn)`
  padding: 8px 48px 24px 0;
  min-width: 280px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    padding: 8px 0 24px 0;
    min-width: auto;
  }

  > :nth-child(1) {
    margin-bottom: 8px;
  }
  > :nth-child(2) {
    margin-bottom: 8px;
  }
  > :nth-child(3) {
    margin-bottom: 12px;
  }
`;

const Title = styled.div`
  ${Inter_14_500}
  color: ${(p) => p.theme.fontPrimary};
`;

export default function TimelineItemInfoHeader({ item }) {
  return (
    <Wrapper>
      <Title>{item.name}</Title>
      <BlockTime ts={item.indexer.blockTime} />
      <BlockHeight number={item.indexer.blockHeight} />
      <IndexerLinks indexer={item.indexer} />
    </Wrapper>
  );
}
