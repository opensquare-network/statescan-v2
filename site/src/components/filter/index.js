import styled from "styled-components";
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import { Panel } from "../styled/panel";
import { Inter_12_600, Inter_14_600 } from "../../styles/text";
import { Flex, FlexBetween } from "../styled/flex";
import { useNavigate } from "react-router-dom";
import { serialize } from "../../utils/viewFuncs";
import FilterIcon from "./filterIcon";
import { useWindowSize } from "@osn/common";
import { useIsDark } from "../../utils/hooks";
import {
  bg_theme500,
  p_x,
  p_y,
  rounded_4,
  w_full,
} from "../../styles/tailwindcss";
import { Button } from "../styled/buttons";

const ForSmallScreen = styled.div`
  display: none;
  @media screen and (max-width: 640px) {
    display: flex;
  }
`;

const Wrapper = styled(Panel)`
  margin-bottom: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  overflow: visible;
  ${Inter_14_600};
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.h2`
  all: unset;
  white-space: nowrap;
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;
  ${Inter_12_600};
`;

const HeadWrapper = styled(FlexBetween)`
  flex-grow: 1;
  flex-basis: 100%;
`;

const DropdownWrapper = styled(Flex)`
  color: ${(p) => p.theme.fontPrimary};
  flex-direction: column;
  align-items: flex-start;
  justify-content: right;
  > :not(:first-child) {
    margin-top: 8px;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterButton = styled(Button)`
  ${p_y(4)};
  ${p_x(12)};
  ${(p) => p.dark && bg_theme500};
  ${rounded_4};

  @media screen and (max-width: 640px) {
    ${w_full};
    ${p_x(0)};
  }
`;

const FilterDivider = styled.div`
  display: flex;
  width: 1px;
  height: 28px;
  margin: 0 24px;
  background: ${(p) => p.theme.strokeBase};
  @media screen and (max-width: 640px) {
    width: 100%;
    margin: 12px 0;
    margin-bottom: 4px;
    height: 1px;
  }
`;

const FilterWrapper = styled(Flex)`
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 24px;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export default function Filter({ title, data }) {
  const navigate = useNavigate();
  const [selectData, setDropdownData] = useState(data);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const { width } = useWindowSize();
  const isDark = useIsDark();

  useEffect(() => {
    setDropdownData(data);
  }, [data]);

  const onDropdown = (name, value, item) => {
    let descendant = item?.descendant ?? null;
    setDropdownData(
      (selectData || []).map((item) => {
        if (item?.name === descendant?.name) {
          const newItem = { ...descendant };
          descendant = descendant?.options?.[0]?.descendant ?? null;
          return newItem;
        }
        return item.name === name ? { ...item, value } : item;
      }),
    );
  };

  const getCurrentFilter = () => {
    const filter = {};
    (selectData || []).forEach((item) => {
      if (item.query && item.value) {
        Object.assign(filter, { [item.query]: item.value });
      }
    });
    return filter;
  };

  const filter_button = (
    <FilterButton
      dark={isDark}
      onClick={() => {
        const search = serialize(getCurrentFilter());
        navigate({ search: `?${search}${search ? "&" : ""}page=1` });
      }}
    >
      Filter
    </FilterButton>
  );

  return (
    <Wrapper>
      <HeadWrapper>
        <Title>{title}</Title>
        <ForSmallScreen>
          <FilterIcon
            active={showFilterPanel}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          />
        </ForSmallScreen>
      </HeadWrapper>
      {(showFilterPanel || width > 640) && selectData?.length > 0 && (
        <FilterWrapper>
          {(selectData || []).map((item, index) =>
            item.name === "divider" ? (
              <FilterDivider key={index} />
            ) : (
              <DropdownWrapper key={index}>
                <span>{item.name}</span>
                <Dropdown
                  isSearch={!!item?.isSearch}
                  value={item.value}
                  name={item.name}
                  options={item.options}
                  query={item.query}
                  subQuery={item.subQuery}
                  onSelect={onDropdown}
                  defaultDisplay={item.defaultDisplay}
                />
              </DropdownWrapper>
            ),
          )}
          {filter_button}
        </FilterWrapper>
      )}
    </Wrapper>
  );
}
