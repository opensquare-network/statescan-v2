import styled from "styled-components";
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import { Panel } from "../styled/panel";
import { Inter_12_600, Inter_14_500, Inter_14_600 } from "../../styles/text";
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
import Input from "../input";
import Checkbox from "../checkbox";
import { useFilterDebounce } from "../../hooks/filter/useFilterDebounce";
import { useUpdateEffect } from "usehooks-ts";
import { useQueryParams } from "../../hooks/useQueryParams";
import noop from "lodash.noop";
import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import isNil from "lodash.isnil";

const ForSmallScreen = styled.div`
  display: none;
  @media screen and (max-width: 900px) {
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
  @media screen and (max-width: 900px) {
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

const InputWrapper = styled(Flex)`
  color: var(--fontPrimary);
  flex-direction: column;
  align-items: flex-start;
  justify-content: right;
  row-gap: 8px;

  @media screen and (max-width: 900px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const DropdownWrapper = styled(Flex)`
  color: ${(p) => p.theme.fontPrimary};
  flex-direction: column;
  align-items: flex-start;
  justify-content: right;
  > :not(:first-child) {
    margin-top: 8px;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const CheckboxWrapper = styled(Flex)`
  color: var(--fontPrimary);
  padding: 4px 0;
  ${Inter_14_500};
`;

const FilterButton = styled(Button)`
  ${p_y(4)};
  ${p_x(12)};
  ${(p) => p.dark && bg_theme500};
  ${rounded_4};

  @media screen and (max-width: 900px) {
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
  @media screen and (max-width: 900px) {
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
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export default function Filter({
  title,
  data,
  showFilterButton = true,
  filterOnDataChange,
  onDataChange = noop,
}) {
  const navigate = useNavigate();
  const [selectData, setDropdownData] = useState(data);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const { width } = useWindowSize();
  const isDark = useIsDark();
  const params = useQueryParams();

  useEffect(() => {
    setDropdownData(data);
  }, [data]);

  const onDropdown = (name, value, item) => {
    let descendant = item?.descendant ?? null;
    setDropdownData(
      (selectData || []).map((item) => {
        if (item?.type === "divider") {
          return item;
        }

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
      if (item.query && !isNil(item.value) && item.value !== "") {
        Object.assign(filter, { [item.query]: item.value });
      }
    });
    return filter;
  };

  function handleFilter() {
    const value = getCurrentFilter();
    if (params[TABLE_SORT_QUERY_KEY])
      value[TABLE_SORT_QUERY_KEY] = params[TABLE_SORT_QUERY_KEY];

    // exclude all filter with persist === false
    data?.forEach?.((item) => {
      if (item.persist === false) {
        delete value[item.query];
      }
    });

    const search = serialize(value);
    navigate({ search: `?${search}${search ? "&" : ""}page=1` });
  }

  const debouncedSelectData = useFilterDebounce(selectData);

  useEffect(() => {
    const filterData = getCurrentFilter();
    onDataChange(filterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectData, onDataChange]);

  useUpdateEffect(() => {
    if (filterOnDataChange) {
      handleFilter();
    }
  }, [debouncedSelectData, filterOnDataChange]);

  const filter_button = (
    <FilterButton dark={isDark} onClick={handleFilter}>
      Filter
    </FilterButton>
  );

  return (
    <Wrapper>
      {title && (
        <HeadWrapper>
          <Title>{title}</Title>
        </HeadWrapper>
      )}
      <ForSmallScreen>
        <FilterIcon
          active={showFilterPanel}
          onClick={() => setShowFilterPanel(!showFilterPanel)}
        />
      </ForSmallScreen>
      {(showFilterPanel || width > 900) && selectData?.length > 0 && (
        <FilterWrapper>
          {(selectData || []).map((item, index) =>
            item.type === "divider" ? (
              <FilterDivider key={index} />
            ) : item.type === "input" ? (
              <InputWrapper key={index}>
                <div>{item.name}</div>
                <Input
                  mini
                  value={item.value}
                  {...(item.inputProps || {})}
                  onChange={(event) => {
                    onDropdown(item.name, event.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleFilter();
                    }
                  }}
                />
              </InputWrapper>
            ) : item.type === "checkbox" ? (
              <CheckboxWrapper key={index}>
                <Checkbox
                  defaultChecked={item.value}
                  label={item.name}
                  onCheckedChange={(checked) => {
                    onDropdown(item.name, checked);
                  }}
                />
              </CheckboxWrapper>
            ) : (
              <DropdownWrapper key={index}>
                <span>{item.name}</span>
                <Dropdown
                  width={item.width}
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
          {showFilterButton && filter_button}
        </FilterWrapper>
      )}
    </Wrapper>
  );
}
