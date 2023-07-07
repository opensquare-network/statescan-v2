import noop from "lodash.noop";
import styled, { css } from "styled-components";
import { ReactComponent as NftUnrecognizedThumbnailSvg } from "./unrecognized-thumbnail.svg";

const Wrapper = styled.div`
  ${(props) =>
    props.onClick !== noop &&
    css`
      cursor: pointer;
    `};
`;

const ThumbnailWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: ${(p) => p.size}px;
  min-height: ${(p) => p.size}px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${(props) => props.background ?? props.theme.fillSub};
  ${(props) =>
    props.onClick !== noop &&
    css`
      cursor: pointer;
    `};
`;

export default function Thumbnail({
  image,
  background,
  size = 32,
  onClick = noop,
}) {
  return image ? (
    <ThumbnailWrapper size={size} onClick={onClick}>
      <img width={size} height={size} src={image} alt="" />
    </ThumbnailWrapper>
  ) : (
    <Wrapper onClick={onClick}>
      <NftUnrecognizedThumbnailSvg
        width={size}
        height={size}
        viewBox="0 0 32 32"
      />
    </Wrapper>
  );
}
