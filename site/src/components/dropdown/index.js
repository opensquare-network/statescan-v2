import { ReactComponent as Caret } from "../icons/caret-down.svg";
import styled, { css } from "styled-components";
import { useState, useRef } from "react";
import { Flex, FlexBetween } from "../styled/flex";
import { useOnClickOutside } from "@osn/common";
import { Inter_14_500 } from "../../styles/text";

const CaretIcon = styled(Caret)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const SelectWrapper = styled(FlexBetween)`
  width: 140px;
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

const OptionItemsWrapper = styled.div`
  max-height: 240px;
  overflow-y: scroll;
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

const SearchBoxWrapper = styled(Flex)`
  height: 52px;
  border-bottom: 1px solid ${(p) => p.theme.strokeBox};
  input {
    all: unset;
    padding: 8px 12px;
    color: ${(p) => p.theme.fontTertiary};
    ${Inter_14_500};
  }
`;

const SearchBox = ({ isSearch, setSearchText, name }) => {
  if (!isSearch) {
    return null;
  }
  return (
    <SearchBoxWrapper>
      <input
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder={`Search of ${name}...`}
      />
    </SearchBoxWrapper>
  );
};

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
            setSearchText={setSearchText}
            name={name}
          />
          <OptionItemsWrapper>
            {displayOptions.map((item, index) => (
              <OptionItem
                key={index}
                isActive={item.value === value && value !== ""}
                onClick={() => {
                  setIsActive(false);
                  if (item.value === value) return;
                  onSelect(name, item.value, item);
                }}
              >
                {item.text}
              </OptionItem>
            ))}
          </OptionItemsWrapper>
        </OptionWrapper>
      )}
    </Wrapper>
  );
}
