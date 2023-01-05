import styled from "styled-components";
import { Flex, FlexColumn } from "../../styled/flex";
import { Inter_14_500 } from "../../../styles/text";
import BlockTime from "./blockTime";
import BlockHeight from "./blockHeight";
import Link from "./link";
import TimelineItemFields from "./itemFields";

const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const Header = styled(FlexColumn)`
  padding: 8px 48px 24px 0;
  min-width: 280px;

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

const Links = styled(Flex)`
  > :nth-child(1) {
    margin-right: 8px;
  }
`;

export default function TimelineItemInfo({ asset, item }) {
  return (
    <Wrapper>
      <Header>
        <Title>{item.name}</Title>
        <BlockTime ts={item.indexer.blockTime} />
        <BlockHeight number={item.indexer.blockHeight} />
        <Links>
          <Link
            name="Extrinsic"
            to={`/extrinsic/${item.indexer.blockHeight}-${item.indexer.extrinsicIndex}`}
          />
          <Link
            name="Event"
            to={`/event/${item.indexer.blockHeight}-${item.indexer.eventIndex}`}
          />
        </Links>
      </Header>
      <TimelineItemFields asset={asset} item={item} />
    </Wrapper>
  );
}
