import styled from "styled-components";
import TimelineItemInfoHeader from "./itemHeader";

const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export default function TimelineItemInfo({ data, item, FieldsComponent }) {
  return (
    <Wrapper>
      <TimelineItemInfoHeader item={item} />
      <FieldsComponent data={data} item={item} />
    </Wrapper>
  );
}
