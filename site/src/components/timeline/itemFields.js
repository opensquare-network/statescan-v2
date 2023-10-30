import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  padding-top: 2px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
`;

const Field = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  padding: 8px 0;
  min-width: 176px;
  ${Inter_14_500}
  flex: 0 0 auto;
  color: ${(p) => p.theme.fontSecondary};
`;

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 8px 0 8px 24px;
  font-size: 14px;
  @media screen and (max-width: 900px) {
    padding-left: 0px;
  }
`;

export default function TimelineItemFields({ fields, className = "" }) {
  return (
    <Wrapper className={className}>
      {fields.map((field, index) => (
        <Field key={index}>
          <Title>{field[0]}</Title>
          <Body>{field[1]}</Body>
        </Field>
      ))}
    </Wrapper>
  );
}
