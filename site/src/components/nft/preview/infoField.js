import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";

const Wrapper = styled.div`
  margin-bottom: 16px;
  width: 50%;
`;

const Field = styled.div`
  ${Inter_14_500}
  color: ${(p) => p.theme.fontTertiary};
`;

const Value = styled.div`
  margin-top: 4px;
  ${Inter_14_500}
  color: ${(p) => p.theme.fontSecondary};
`;

export default function InfoField({ name, value }) {
  return (
    <Wrapper>
      <Field>{name}</Field>
      <Value>{value}</Value>
    </Wrapper>
  );
}
