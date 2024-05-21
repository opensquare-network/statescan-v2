import styled from "styled-components";

const Wrapper = styled.span`
  color: var(--fontTertiary);
  display: inline-block;
`;

export default function Dot({ className = "", style = {}, ...props }) {
  return (
    <Wrapper {...props} style={style} className={className}>
      ·
    </Wrapper>
  );
}
