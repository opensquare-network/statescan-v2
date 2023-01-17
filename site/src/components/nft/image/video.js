import styled from "styled-components";
import { h, max_w_full, w } from "../../../styles/tailwindcss";

const StyledVideo = styled.video`
  object-fit: contain;
  ${max_w_full};
  ${(p) => w(p.width)};
  ${(p) => h(p.height)};
`;

export default function Video({ src, width, height, type }) {
  return (
    <StyledVideo
      src={src}
      width={width}
      height={height}
      alt=""
      autoPlay
      playsInline
      loop
      muted
    >
      <source src={src} type={type} />
    </StyledVideo>
  );
}
