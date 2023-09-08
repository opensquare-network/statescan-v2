import { ReactComponent as Caret } from "../icons/caret-down.svg";
import styled, { css } from "styled-components";
import { useState, useRef } from "react";
import { Flex, FlexBetween } from "../styled/flex";
import { useOnClickOutside } from "@osn/common";
import Options from "./options";
import { Inter_14_500 } from "../../styles/text";
import { border_theme, border_theme500 } from "../../styles/tailwindcss";

const CaretIcon = styled(Caret)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

const Wrapper = styled(Flex)`
  flex-grow: 1;
  position: relative;
`;

const SelectWrapper = styled(FlexBetween)`
  flex-grow: 1;
  padding: 0 6px 0 12px;
  width: ${(p) => p.width || 140}px;
  height: 26px;
  background: ${(p) => p.theme.fillPopup};
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${(p) => p.theme.strokeBox};
  white-space: nowrap;
  ${Inter_14_500};
  > span {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > img {
    margin-left: 8px;
  }

  :hover {
    ${border_theme("strokeBoxSelected")};
  }

  ${(p) =>
    p.isActive &&
    css`
      ${border_theme500};
      box-shadow: 0 0 0 2px ${(p) => p.theme.theme100};

      :hover {
        color: inherit;
        ${border_theme500};
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
  width,
}) {
  const ref = useRef();
  useOnClickOutside(ref, () => setIsActive(false));
  const [isActive, setIsActive] = useState(false);
  const showText = options.find((item) => item.value === value)?.text;

  return (
    <Wrapper ref={ref}>
      <SelectWrapper
        width={width}
        onClick={() => setIsActive(!isActive)}
        isActive={isActive}
      >
        <span>{showText ?? defaultDisplay}</span>
        <CaretIcon />
      </SelectWrapper>
      {isActive && (
        <Options
          width={width}
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
