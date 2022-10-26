import styled from "styled-components";
import { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import { Panel } from "../styled/panel";
import { Inter_14_600 } from "../../styles/text";
import { Flex, FlexBetween } from "../styled/flex";
import { useNavigate } from "react-router-dom";
import * as queryString from "query-string";

const ForLargeScreen = styled.div`
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const ForSmallScreen = styled.div`
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
  }
`;

const Wrapper = styled(Panel)`
  margin-bottom: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: visible;
  ${Inter_14_600};
  @media screen and (max-width: 1100px) {
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
`;

const DropdownWrapper = styled(Flex)`
  @media screen and (max-width: 1100px) {
    flex-grow: 1;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex-basis: 100%;
  }

  > :not(:first-child) {
    margin-left: 16px;
  }
  color: ${(p) => p.theme.fontPrimary};
`;

const Button = styled.div`
  background: ${(p) => p.theme.fillButton};
  border-radius: 4px;
  padding: 4px 12px;
  ${Inter_14_600};
  color: ${({ theme }) => theme.fontPrimaryInverse};
  cursor: pointer;
  text-align: center;
`;

const FilterWrapper = styled(Flex)`
  flex-grow: 1;
  flex-wrap: nowrap;
  justify-content: end;
  gap: 24px;
  @media screen and (max-width: 1100px) {
    flex-wrap: wrap;
    gap: 16px;
  }
`;

export default function Filter({ title, data }) {
  const navigate = useNavigate();
  const [selectData, setDropdownData] = useState(data);

  useEffect(() => {
    setDropdownData(data);
  }, [data]);

  const onDropdown = (name, value, item) => {
    const descendant = item?.descendant ? item?.descendant : null;
    console.log(item);
    setDropdownData(
      (selectData || []).map((item) => {
        if (item?.name === descendant?.name) {
          return descendant;
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
        const search = queryString.stringify(getCurrentFilter());
        navigate({ search: `?page=1${search ? "&" : ""}${search}` });
      }}
    >
      Filter
    </Button>
  );

  return (
    <Wrapper>
      <HeadWrapper>
        <Title>{title}</Title>
        <ForSmallScreen>{filter_button}</ForSmallScreen>
      </HeadWrapper>
      {selectData?.length > 0 && (
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
              />
            </DropdownWrapper>
          ))}
          <ForLargeScreen>{filter_button}</ForLargeScreen>
        </FilterWrapper>
      )}
    </Wrapper>
  );
}
