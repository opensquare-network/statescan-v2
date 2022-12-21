import styled, { css } from "styled-components";
import { smcss } from "../../styles/responsive";

const Wrapper = styled.div`
  margin: 0 auto;
  /* width: 100%; */
  max-width: 1360px;
  padding: 0 24px;
  box-sizing: border-box;

  ${smcss(css`
    padding: 0 16px;
  `)}
`;

export default function Container({ children, style = {}, className }) {
  return (
    <Wrapper style={style} className={className}>
      {children}
    </Wrapper>
  );
}
