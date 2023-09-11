import noop from "lodash.noop";
import styled, { css } from "styled-components";
import { Flex } from "../../styled/flex";
import { ReactComponent as SortAscend } from "../../icons/sort-ascend.svg";
import { ReactComponent as SortDescend } from "../../icons/sort-descend.svg";
import { useEffect, useState } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import omit from "lodash.omit";
import { useNavigate } from "react-router-dom";
import { serialize } from "../../../utils/viewFuncs";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import { TABLE_SORT_QUERY_KEY } from "../../../utils/constants";

const Wrapper = styled(Flex)`
  column-gap: 4px;
  cursor: pointer;

  ${(p) =>
    p.reverse &&
    css`
      flex-direction: row-reverse;
    `}

  ${(p) =>
    p.active &&
    css`
      color: var(--fontSecondary);

      svg {
        path {
          fill: var(--fontSecondary);
        }
      }
    `}
`;

export default function SortableHead({
  activeSortQueryValue,
  setActiveSortQueryValue = noop,
  children,
  head,
}) {
  const {
    align,
    sortDefaultQueryValue,
    sortAscendingQueryValue,
    sortDescendingQueryValue,
  } = head ?? {};

  const navigate = useNavigate();
  const queryParams = useQueryParams();

  const [active, setActive] = useState();
  useEffect(() => {
    if (queryParams[TABLE_SORT_QUERY_KEY]) {
      if (
        queryParams[TABLE_SORT_QUERY_KEY] === sortAscendingQueryValue ||
        queryParams[TABLE_SORT_QUERY_KEY] === sortDescendingQueryValue
      ) {
        setActive(true);
      }
    } else if (sortDefaultQueryValue) {
      setActive(true);
      setActiveSortQueryValue(sortDefaultQueryValue);
    }
  }, [
    queryParams,
    sortAscendingQueryValue,
    sortDefaultQueryValue,
    sortDescendingQueryValue,
  ]);
  useUpdateEffect(() => {
    setActive(
      activeSortQueryValue === sortAscendingQueryValue ||
        activeSortQueryValue === sortDescendingQueryValue,
    );
  }, [activeSortQueryValue, sortAscendingQueryValue, sortDescendingQueryValue]);

  const [descending, setDescending] = useState(true);
  useEffectOnce(() => {
    if (
      queryParams[TABLE_SORT_QUERY_KEY] === sortAscendingQueryValue ||
      sortDefaultQueryValue === sortAscendingQueryValue
    ) {
      setDescending(false);
    } else if (queryParams[TABLE_SORT_QUERY_KEY] === sortDescendingQueryValue) {
      setDescending(true);
    } else {
      setDescending(true);
    }
  });

  function handleSort() {
    const newQueryParams = omit(queryParams, [TABLE_SORT_QUERY_KEY]);

    if (!active) {
      setDescending(true);
      setActiveSortQueryValue(sortDescendingQueryValue);
      newQueryParams[TABLE_SORT_QUERY_KEY] = sortDescendingQueryValue;
    } else {
      const newDirection = !descending;
      const sortQueryValue = newDirection
        ? sortDescendingQueryValue
        : sortAscendingQueryValue;
      setDescending(newDirection);
      setActiveSortQueryValue(sortQueryValue);
      newQueryParams[TABLE_SORT_QUERY_KEY] = sortQueryValue;
    }

    const search = serialize(newQueryParams);
    navigate({ search });
  }

  return (
    <Wrapper active={active} reverse={align === "right"} onClick={handleSort}>
      {children}

      {active && (descending ? <SortDescend /> : <SortAscend />)}
    </Wrapper>
  );
}
