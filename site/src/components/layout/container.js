import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1312px;
  padding: 0 24px;
  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
  box-sizing: border-box;
`;

export default function Container({ children, style = {} }) {
  return <Wrapper style={style}>{children}</Wrapper>;
}
