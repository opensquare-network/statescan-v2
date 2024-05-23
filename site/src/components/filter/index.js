import styled from "styled-components";
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import { Panel } from "../styled/panel";
import { Inter_12_600, Inter_14_500, Inter_14_600 } from "../../styles/text";
import { Flex, FlexBetween, FlexCenter, FlexColumn } from "../styled/flex";
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
import { Button, PanelButton } from "../styled/buttons";
import Input from "../input";
import Checkbox from "../checkbox";
import { useFilterDebounce } from "../../hooks/filter/useFilterDebounce";
import { useUpdateEffect } from "usehooks-ts";
import { useQueryParams } from "../../hooks/useQueryParams";
import noop from "lodash.noop";
import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import isNil from "lodash.isnil";
import { useDispatch } from "react-redux";
import { setCurrentFilterValue } from "../../store/reducers/filterSlice";
import FilterDatePicker from "./datepicker";
import moment from "moment";
import Loading from "../loadings/loading";

const ForSmallScreen = styled.div`
  display: none;
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

const Wrapper = styled(Panel)`
  margin-bottom: 16px;
  padding: 28px 24px;
  display: flex;
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

const InputWrapper = styled(FlexColumn)`
  color: var(--fontPrimary);
  justify-content: right;
  row-gap: 8px;

  @media screen and (max-width: 900px) {
    flex-grow: 1;
  }
  @media screen and (min-width: 900px) {
    width: 160px;
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
const ResetButton = styled(PanelButton)`
  padding: 3px 11px;
  border-radius: 4px;

  @media screen and (max-width: 900px) {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
`;

const FilterDivider = styled.div`
  display: flex;
  width: 1px;
  height: 28px;
  background: ${(p) => p.theme.strokeBase};
  @media screen and (max-width: 900px) {
    width: 100%;
    margin: 12px 0;
    margin-bottom: 4px;
    height: 1px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
  width: 100%;
  gap: 24px;
`;

const FilterForm = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
  @media screen and (min-width: 900px) {
    flex-direction: row;
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 24px;
  }
`;

const FilterActions = styled(Flex)`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: end;
  column-gap: 10px;
`;

const NewLine = styled.div`
  width: 100%;
  margin: 8px 0;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-grow: 1;
    flex-direction: column;
  }
  @media screen and (min-width: 900px) {
    width: 160px;
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
  const dispatch = useDispatch();

  useEffect(() => {
    setDropdownData(data);
  }, [data]);

  function reset() {
    const newData = selectData.map((item) => {
      if (!item.value) {
        return item;
      }

      const defaultValue = item.defaultValue;
      if (defaultValue) {
        item.value = defaultValue;
      } else {
        if (item.options?.length > 0) {
          const first = item.options[0];
          item.value = first.value;
        } else if (item.type === "checkbox") {
          item.value = false;
        } else {
          item.value = "";
        }
      }

      return item;
    });

    setDropdownData(newData);
    dispatch(setCurrentFilterValue({}));
    navigate("");
  }

  const onDropdown = (name, value, item) => {
    let descendant = item?.descendant ?? null;
    setDropdownData(
      (selectData || []).map((item) => {
        if (["divider", "newline"].includes(item?.type)) {
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

    const filterItem = selectData.find((filter) => filter.name === name);
    if (filterItem.type !== "input") {
      dispatch(
        setCurrentFilterValue({
          ...getCurrentFilter(),
          [filterItem.query]: value,
        }),
      );
    }
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

  if (!data?.length) {
    return (
      <Wrapper style={{ height: 56 }}>
        <FlexCenter style={{ width: "100%" }}>
          <Loading style={{ padding: 0 }} />
        </FlexCenter>
      </Wrapper>
    );
  }

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
          <FilterForm>
            {(selectData || []).map((item, index) =>
              item.type === "newline" ? (
                <NewLine key={index} />
              ) : item.type === "divider" ? (
                <FilterDivider key={index} />
              ) : item.type === "date_start" ? (
                <DatePickerWrapper>
                  <FilterDatePicker
                    key={index}
                    {...item}
                    onChange={(date) => {
                      const timestamp = moment(date).startOf("day").valueOf();
                      onDropdown(item.name, timestamp);
                    }}
                  />
                </DatePickerWrapper>
              ) : item.type === "date_end" ? (
                <DatePickerWrapper>
                  <FilterDatePicker
                    key={index}
                    {...item}
                    onChange={(date) => {
                      const timestamp = moment(date).endOf("day").valueOf();
                      onDropdown(item.name, timestamp);
                    }}
                  />
                </DatePickerWrapper>
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
          </FilterForm>
          <FilterActions>
            <ResetButton onClick={reset}>Reset</ResetButton>
            {showFilterButton && filter_button}
          </FilterActions>
        </FilterWrapper>
      )}
    </Wrapper>
  );
}
