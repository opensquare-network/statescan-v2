import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 320px;
  background: ${(p) => p.theme.fillPanel};
`;

const Masked = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  position: relative;
  top: -8px;
  background: radial-gradient(
    87.94% 100% at 50% 100%,
    #f1f1f1 0%,
    ${(p) => p.theme.fillPanelHover} 64.58%,
    ${(p) => p.theme.fillPanel} 100%
  );
  -webkit-mask-image: url("/imgs/pattern-dot.svg");
  mask-image: url("/imgs/pattern-dot.svg");
  -webkit-mask-repeat: repeat;
  mask-repeat: repeat;
`;

export default function Background() {
  return (
    <Wrapper>
      <Masked />
    </Wrapper>
  );
}
