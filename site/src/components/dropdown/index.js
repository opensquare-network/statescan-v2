import { ReactComponent as Caret } from "../icons/caret-down.svg";
import styled, { css } from "styled-components";
import { useState, useRef } from "react";
import { FlexBetween } from "../styled/flex";
import { useOnClickOutside } from "@osn/common";
import Options from "./options";

const CaretIcon = styled(Caret)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const SelectWrapper = styled(FlexBetween)`
  padding: 0 6px 0 12px;
  width: 140px;
  height: 26px;
  background: ${(p) => p.theme.fillPopup};
  border-radius: 6px;
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

export default function Dropdown({
  value,
  options,
  name,
  onSelect,
  isSearch = false,
  defaultDisplay = "",
}) {
  const ref = useRef();
  useOnClickOutside(ref, () => setIsActive(false));
  const [isActive, setIsActive] = useState(false);
  const showText = options.find((item) => item.value === value)?.text;

  return (
    <Wrapper ref={ref}>
      <SelectWrapper onClick={() => setIsActive(!isActive)} isActive={isActive}>
        <span>{showText ?? defaultDisplay}</span>
        <CaretIcon />
      </SelectWrapper>
      {isActive && (
        <Options
          setIsActive={setIsActive}
          value={value}
          isSearch={isSearch}
          options={options}
          name={name}
          onSelect={onSelect}
        />
      )}
    </Wrapper>
  );
}
