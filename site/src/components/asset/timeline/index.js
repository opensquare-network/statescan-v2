import styled from "styled-components";
import { FlexColumn } from "../../styled/flex";
import TimelineItem from "./item";

const Wrapper = styled(FlexColumn)`
  width: 100%;
`;

export default function AssetTimeline({ asset, timeline, loading }) {
  return (
    <Wrapper>
      {(timeline || []).map((item, index) => (
        <TimelineItem
          asset={asset}
          item={item}
          isFirst={index === 0}
          isLast={index === timeline.length - 1}
        />
      ))}
    </Wrapper>
  );
}
