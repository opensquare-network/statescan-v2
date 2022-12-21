import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  z-index: -10;
`;

const DotWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 294px;
  background-color: ${(p) => p.theme.fillPanel};
`;

const Dot = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.8;

  background: radial-gradient(
    87.94% 100% at 50% 100%,
    ${(p) => p.theme.fillAlpha} 0%,
    ${(p) => p.theme.fillBeta} 64.58%,
    ${(p) => p.theme.fillGamma} 100%
  );
  mask-image: url("/imgs/pattern-dot.svg");
  mask-repeat: repeat;
`;

const Base = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(p) => p.theme.fillBase};
  z-index: -1;
`;

export default function Background() {
  return (
    <Wrapper>
      <DotWrapper>
        <Dot />
      </DotWrapper>

      <Base />
    </Wrapper>
  );
}
