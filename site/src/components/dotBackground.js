import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 320px;
  background-color: ${(p) => p.theme.fillPanel};
  z-index: 0;
`;

const Masked = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  position: relative;
  top: -8px;

  background: radial-gradient(
    87.94% 100% at 50% 100%,
    ${(p) => p.theme.fillAlpha} 0%,
    ${(p) => p.theme.fillBeta} 64.58%,
    ${(p) => p.theme.fillGamma} 100%
  );
  mask-image: url("/imgs/pattern-dot.svg");
  mask-repeat: repeat;
`;

export default function Background() {
  return (
    <Wrapper>
      <Masked />
    </Wrapper>
  );
}
