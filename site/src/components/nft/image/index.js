import { Image } from "semantic-ui-react";
import styled from "styled-components";
import { isCid } from "../../../utils/cid";
import { ReactComponent as NftUnrecognizedSvg } from "./nft-unrecognized.svg";

const ImgWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.background ?? "#555555"};

  img {
    object-fit: contain;
  }
`;

export default function NftImage({ parsedMetadata }) {
  const {
    image,
    resource: { metadata: { width, height, background, isDataUrl } = {} } = {},
  } = parsedMetadata || {};

  if (isDataUrl) {
    return (
      <ImgWrapper>
        <Image
          src={image}
          width={width ?? 480}
          height={height ?? 480}
          alt=""
          layout="fill"
        />
      </ImgWrapper>
    );
  }

  const isImageCid = isCid(image);

  if (!isImageCid) {
    return (
      <ImgWrapper background={background}>
        <NftUnrecognizedSvg
          width={"100%"}
          height={"100%"}
          viewBox="0 0 480 480"
        />
      </ImgWrapper>
    );
  }

  return (
    <ImgWrapper background={background}>
      <Image
        src={`https://ipfs.3be42fb1.workers.dev/ipfs/${image}`}
        width={width ?? 480}
        height={height ?? 480}
        alt=""
        placeholder="blur"
      />
    </ImgWrapper>
  );
}
