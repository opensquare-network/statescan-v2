import styled from "styled-components";

export const PC = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const Mobile = styled.div`
  @media screen and (min-width: 600px) {
    display: none;
  }
`;
