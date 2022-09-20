import styled from "styled-components";
import { useState } from "react";
import { Flex } from "./flex";

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 56px;
  height: 32px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + .slider-wrapper {
    background: ${(p) => p.theme.fillSub};
  }

  input:checked + .slider-wrapper > * {
    transform: translateX(26px);
  }
`;

const SliderWrapper = styled.div`
  padding: 4px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(p) => p.theme.fillSub};
  border-radius: 24px;

  > * {
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

const Slider = styled(Flex)`
  padding: 4px;
  width: 14px;
  height: 14px;
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBase};
  box-shadow: ${(p) => p.theme.shadowPanel};
  border-radius: 14px;
`;

export default function Switch({
  on = false,
  children = null,
  onToggle = false,
}) {
  const [status, setStatus] = useState(on);

  const handleChange = (e) => {
    setStatus(e.target.value);
    onToggle && onToggle(e.target.value);
  };

  return (
    <Wrapper>
      <input
        type="checkbox"
        checked={status}
        onChange={(e) => {
          handleChange({
            target: {
              value: e.target.checked,
            },
          });
        }}
      />
      <SliderWrapper className="slider-wrapper">
        <Slider className="slider">{children}</Slider>
      </SliderWrapper>
    </Wrapper>
  );
}
