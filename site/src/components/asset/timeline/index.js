import styled from "styled-components";
import Loading from "../../loadings/loading";
import NoData from "../../noData";
import { FlexColumn } from "../../styled/flex";
import TimelineItem from "./item";

const Wrapper = styled(FlexColumn)`
  width: 100%;
`;

export default function AssetTimeline({ asset, timeline, loading }) {
  if (!timeline || loading) {
    return <Loading />;
  }

  if (!timeline?.length) {
    return <NoData />;
  }

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
