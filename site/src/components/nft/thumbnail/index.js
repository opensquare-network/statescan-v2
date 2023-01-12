import styled, { css } from "styled-components";
import { ReactComponent as NftUnrecognizedThumbnailSvg } from "./unrecognized-thumbnail.svg";

const Wrapper = styled.div`
  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `};
`;

const ThumbnailWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${(props) => props.background ?? "#555555"};
  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `};
`;

export default function Thumbnail({
  image,
  background,
  size = 32,
  onClick = () => {},
}) {
  return image ? (
    <ThumbnailWrapper size={size} onClick={onClick} background={background}>
      <img width={size} src={image} alt="" />
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
