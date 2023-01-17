import styled from "styled-components";
import { h, max_w_full, w } from "../../../styles/tailwindcss";
import { isCid } from "../../../utils/cid";
import SquareBox from "./squareBox";
import { ReactComponent as NftUnrecognizedSvg } from "./nft-unrecognized.svg";

const Image = styled.img`
  object-fit: contain;
  ${max_w_full};
  ${(p) => w(p.width)};
  ${(p) => h(p.height)};
`;

const Video = styled.video`
  object-fit: contain;
  ${max_w_full};
  ${(p) => w(p.width)};
  ${(p) => h(p.height)};
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.background ?? "#555555"};
`;

function ImageBox({ children, background }) {
  return (
    <SquareBox background={background}>
      <ImageWrapper background={background}>{children}</ImageWrapper>
    </SquareBox>
  );
}

export default function NftImage({ parsedMetadata }) {
  const {
    image,
    resource: {
      type,
      metadata: { width, height, background, isDataUrl } = {},
    } = {},
  } = parsedMetadata || {};

  if (isDataUrl) {
    return (
      <ImageBox background={background}>
        <Image src={image} width={width ?? 480} height={height ?? 480} alt="" />
      </ImageBox>
    );
  }

  const isImageCid = isCid(image);

  if (!isImageCid) {
    return (
      <ImageBox background={background}>
        <NftUnrecognizedSvg
          width={"100%"}
          height={"100%"}
          viewBox="0 0 480 480"
        />
      </ImageBox>
    );
  }

  return (
    <ImageBox background={background}>
      {type.startsWith("video/") ? (
        <Video
          src={`${process.env.REACT_APP_DEFAULT_IPFS_GATEWAY}${image}`}
          width={width ?? 480}
          height={height ?? 480}
          alt=""
          autoPlay
          playsInline
          loop
          muted
        >
          <source
            src={`${process.env.REACT_APP_DEFAULT_IPFS_GATEWAY}${image}`}
            type={type}
          />
        </Video>
      ) : (
        <Image
          src={`${process.env.REACT_APP_DEFAULT_IPFS_GATEWAY}${image}`}
          width={width ?? 480}
          height={height ?? 480}
          alt=""
        />
      )}
    </ImageBox>
  );
}
