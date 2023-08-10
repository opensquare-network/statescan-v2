import SearchBox from "./searchBox";
import styled, { css } from "styled-components";
import { pretty_scroll_bar } from "../../styles";
import { Inter_14_500 } from "../../styles/text";
import { useState } from "react";
import { border, border_theme } from "../../styles/tailwindcss";
import Divider from "../styled/divider";

const OptionWrapper = styled.div`
  z-index: 99;
  position: absolute;
  padding: 8px 0;
  background: ${(p) => p.theme.fillPopup};
  left: 0;
  top: 32px;
  min-width: 100%;
  box-shadow: ${(p) => p.theme.shadowPanel};
  overflow: hidden;
  border-radius: 8px;
  ${border};
  ${border_theme("strokeBase")};
`;

const OptionItemsWrapper = styled.div`
  max-height: 240px;
  overflow-y: scroll;
  ${pretty_scroll_bar};
`;

const NoOption = styled.div`
  padding: 8px 12px;
  ${Inter_14_500};
  color: ${(p) => p.theme.fontTertiary};
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

function Options({ value, isSearch, options, name, onSelect, setIsActive }) {
  const [searchText, setSearchText] = useState("");

  return (
    <OptionWrapper>
      <SearchBox
        isSearch={isSearch}
        searchText={searchText}
        setSearchText={setSearchText}
        name={name}
      />
      <OptionItemsWrapper>
        {options.map((option, index) =>
          option?.type === "divider" ? (
            <Divider key={index} />
          ) : (
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
          ),
        )}
        {options.length === 0 && <NoOption>No result found</NoOption>}
      </OptionItemsWrapper>
    </OptionWrapper>
  );
}

export default Options;
