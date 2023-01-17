import styled from "styled-components";
import { h, max_w_full, w } from "../../../styles/tailwindcss";

const StyledImage = styled.img`
  object-fit: contain;
  ${max_w_full};
  ${(p) => w(p.width)};
  ${(p) => h(p.height)};
`;

export default function Image({ src, width, height }) {
  return <StyledImage src={src} width={width} height={height} alt="" />;
}
