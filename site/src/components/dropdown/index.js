import { ReactComponent as Caret } from "../icons/caret-down.svg";
import styled, { css } from "styled-components";
import { useState, useRef } from "react";
import { FlexBetween } from "../styled/flex";
import { useOnClickOutside } from "@osn/common";
import { Inter_14_500 } from "../../styles/text";
import { pretty_scroll_bar } from "../../styles";
import SearchBox from "./searchBox";

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

const OptionItemsWrapper = styled.div`
  max-height: 240px;
  overflow-y: scroll;
  ${pretty_scroll_bar};
`;

const OptionItem = styled.div`
  padding: 8px 12px;
  ${Inter_14_500};
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

export default function Dropdown({
  value,
  options,
  name,
  onSelect,
  isSearch = false,
}) {
  const [isActive, setIsActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const ref = useRef();
  useOnClickOutside(ref, () => setIsActive(false));

  const showText = options.find((item) => item.value === value)?.text;

  const displayOptions =
    options.filter((item) =>
      item.text.toLowerCase().includes(searchText.toLowerCase()),
    ) ?? [];

  return (
    <Wrapper ref={ref}>
      <SelectWrapper onClick={() => setIsActive(!isActive)} isActive={isActive}>
        <span>{showText}</span>
        <CaretIcon />
      </SelectWrapper>
      {isActive && (
        <OptionWrapper>
          <SearchBox
            isSearch={isSearch}
            searchText={searchText}
            setSearchText={setSearchText}
            name={name}
          />
          <OptionItemsWrapper>
            {displayOptions.map((option, index) => (
              <OptionItem
                key={index}
                isActive={option.value === value && value !== ""}
                onClick={() => {
                  setIsActive(false);
                  if (option.value === value) return;
                  onSelect(name, option.value, option);
                  setSearchText("");
                }}
              >
                {option.text}
              </OptionItem>
            ))}
          </OptionItemsWrapper>
        </OptionWrapper>
      )}
    </Wrapper>
  );
}
