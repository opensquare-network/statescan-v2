import styled from "styled-components";
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import { Panel } from "../styled/panel";
import { Inter_14_600 } from "../../styles/text";
import { Flex, FlexBetween } from "../styled/flex";
import { useNavigate } from "react-router-dom";
import { serialize } from "../../utils/viewFuncs";
import FilterIcon from "./filterIcon";
import { useWindowSize } from "@osn/common";

const ForSmallScreen = styled.div`
  display: none;
  @media screen and (max-width: 1150px) {
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
  @media screen and (max-width: 1150px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.h2`
  all: unset;
  font-weight: 600;
  white-space: nowrap;
  color: ${(p) => p.theme.fontPrimary};
`;

const HeadWrapper = styled(FlexBetween)`
  flex-grow: 1;
  flex-basis: 100%;
`;

const DropdownWrapper = styled(Flex)`
  @media screen and (max-width: 1150px) {
    flex-direction: column;
    align-items: stretch;
    > :not(:first-child) {
      margin-left: 0;
      margin-top: 8px;
    }
  }
  > :not(:first-child) {
    margin-left: 16px;
  }
  color: ${(p) => p.theme.fontPrimary};
`;

const Button = styled.div`
  padding: 4px 12px;
  background: ${(p) => p.theme.fillButton};
  border-radius: 4px;
  ${Inter_14_600};
  color: ${({ theme }) => theme.fontPrimaryInverse};
  cursor: pointer;
  text-align: center;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  > :not(:first-child) {
    margin-left: 24px;
  }
  @media screen and (max-width: 1150px) {
    flex-direction: column;
    > :not(:first-child) {
      margin: 16px 0 0;
    }
  }
`;

export default function Filter({ title, data }) {
  const navigate = useNavigate();
  const [selectData, setDropdownData] = useState(data);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const { width } = useWindowSize();

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
    <Button
      onClick={() => {
        const search = serialize(getCurrentFilter());
        navigate({ search: `?${search}${search ? "&" : ""}page=1` });
      }}
    >
      Filter
    </Button>
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
      {(showFilterPanel || width > 1150) && selectData?.length > 0 && (
        <FilterWrapper>
          {(selectData || []).map((item, index) => (
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
          ))}
          {filter_button}
        </FilterWrapper>
      )}
    </Wrapper>
  );
}
