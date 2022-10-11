import { ReactComponent as Caret } from "../icons/caret-down.svg";
import { useOnClickOutside } from "../../utils/hooks";
import styled, { css } from "styled-components";
import { useState, useRef } from "react";
import { FlexBetween } from "../styled/flex";

const CaretIcon = styled(Caret)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const SelectWrapper = styled(FlexBetween)`
  width: 160px;
  height: 26px;
  background: ${(p) => p.theme.fillPopup};
  border-radius: 6px;
  padding: 0 6px 0 12px;
  cursor: pointer;
  border: 1px solid ${(p) => p.theme.strokeBox};
  white-space: nowrap;

  > span {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > img {
    margin-left: 8px;
  }

  :hover {
    border-color: ${(p) => p.theme.strokeBoxHover};
  }

  ${(p) =>
    p.isActive &&
    css`
      border-color: ${(p) => p.theme.strokeBoxHover};

      :hover {
        color: inherit;
      }
    `}
`;

const OptionWrapper = styled.div`
  z-index: 99;
  position: absolute;
  padding: 8px 0;
  background: ${(p) => p.theme.fillPopup};
  left: 0;
  top: 40px;
  min-width: 100%;
  box-shadow: ${(p) => p.theme.shadowPanel};
  overflow: hidden;
  border-radius: 8px;
`;

const OptionItem = styled.div`
  padding: 6px 12px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    background: ${(p) => p.theme.fillPopupHover};
  }

  ${(p) =>
    p.isActive &&
    css`
      background: ${(p) => p.theme.fillPopupHover};
    `}
`;

export default function Dropdown({ value, options, name, onSelect }) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsActive(false));

  const showText = options.find((item) => item.value === value)?.text;

  return (
    <Wrapper ref={ref}>
      <SelectWrapper onClick={() => setIsActive(!isActive)} isActive={isActive}>
        <span>{showText}</span>
        <CaretIcon />
      </SelectWrapper>
      {isActive && (
        <OptionWrapper>
          {(options || []).map((item, index) => (
            <OptionItem
              key={index}
              isActive={item.value === value}
              onClick={() => {
                setIsActive(false);
                if (item.value === value) return;
                onSelect(name, item.value);
              }}
            >
              {item.text}
            </OptionItem>
          ))}
        </OptionWrapper>
      )}
    </Wrapper>
  );
}
