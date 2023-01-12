import isNil from "lodash.isnil";
import styled, { css } from "styled-components";
import { Inter_14_500 } from "../../styles/text";

const Wrapper = styled.span`
  ${Inter_14_500}
  word-break: break-all;
  ${(props) =>
    props.unrecognized
      ? css`
          color: ${(p) => p.theme.fontSecondary};
        `
      : css`
          color: ${(p) => p.theme.fontPrimary};
        `};
  :hover {
    color: inherit;
  }
`;

export default function NftName({ name }) {
  return (
    <Wrapper unrecognized={isNil(name)}>{name || "[Unrecognized]"}</Wrapper>
  );
}
