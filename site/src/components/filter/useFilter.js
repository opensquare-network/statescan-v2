import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import Dropdown from "../dropdown";
import { Inter_14_500 } from "../../styles/text";
import { Flex, FlexColumn } from "../styled/flex";
import { useNavigate } from "react-router-dom";
import { serialize } from "../../utils/viewFuncs";
import Input from "../input";
import Checkbox from "../checkbox";
import { useFilterDebounce } from "../../hooks/filter/useFilterDebounce";
import { useUpdateEffect } from "usehooks-ts";
import { useQueryParams } from "../../hooks/useQueryParams";
import noop from "lodash.noop";
import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import isNil from "lodash.isnil";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentFilterValue,
  currentFilterValueSelector,
} from "../../store/reducers/filterSlice";
import FilterDatePicker from "./datepicker";
import moment from "moment";

const Wrapper = styled(FlexColumn)`
  color: var(--fontPrimary);
  justify-content: right;
  row-gap: 8px;
`;

const InputWrapper = styled(Wrapper)`
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

export default function useFilter({
  data,
  filterOnDataChange,
  onDataChange = noop,
}) {
  const navigate = useNavigate();
  const [selectData, setDropdownData] = useState(data);
  const params = useQueryParams();
  const dispatch = useDispatch();
  const currentFilterValue = useSelector(currentFilterValueSelector);

  useEffect(() => {
    setDropdownData(data);
  }, [data]);

  const getCurrentFilter = useCallback(() => {
    const filter = {};
    (selectData || []).forEach((item) => {
      if (item.query && !isNil(item.value) && item.value !== "") {
        Object.assign(filter, { [item.query]: item.value });
      }
    });
    return filter;
  }, [selectData]);

  const handleReset = useCallback(() => {
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
  }, [dispatch, navigate, selectData]);

  const onDropdown = useCallback(
    (name, value, item) => {
      let descendant = item?.descendant ?? null;
      setDropdownData(
        (selectData || []).map((item) => {
          if (["divider", "newline"].includes(item?.type)) {
            return item;
          }

          if (item?.name === descendant?.name) {
            const newItem = { ...item, ...descendant };
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
            ...currentFilterValue,
            ...getCurrentFilter(),
            [filterItem.query]: value,
          }),
        );
      }
    },
    [dispatch, selectData, getCurrentFilter, currentFilterValue],
  );

  const handleFilter = useCallback(() => {
    const { page = 1 } = params;
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
    navigate({ search: `?${search}${search ? "&" : ""}page=${page}` });
  }, [data, getCurrentFilter, navigate, params]);

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

  const component = (selectData || []).map((item, index) =>
    item.type === "newline" ? (
      <NewLine key={index} />
    ) : item.type === "divider" ? (
      <FilterDivider key={index} />
    ) : item.type === "date_start" ? (
      <DatePickerWrapper key={index}>
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
      <DatePickerWrapper key={index}>
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
    ) : item.type === "custom" ? (
      <Wrapper key={index}>
        <div>{item.name}</div>
        {item.component}
      </Wrapper>
    ) : (
      <DropdownWrapper key={index}>
        <span>{item.name}</span>
        <Dropdown
          width={item.width}
          optionWidth={item.optionWidth}
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
  );

  return {
    selectData,
    component,
    handleReset,
    handleFilter,
    getCurrentFilter,
  };
}
