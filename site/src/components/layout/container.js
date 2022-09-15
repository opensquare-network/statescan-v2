import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1312px;
  @media screen and (max-width: 1312px) {
    margin: 0 24px;
  }
`;

export default function Container({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
