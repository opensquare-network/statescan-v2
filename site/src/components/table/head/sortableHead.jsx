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
  const params = useQueryParams();

  const [active, setActive] = useState();
  useEffect(() => {
    if (params[TABLE_SORT_QUERY_KEY]) {
      if (
        params[TABLE_SORT_QUERY_KEY] === sortAscendingQueryValue ||
        params[TABLE_SORT_QUERY_KEY] === sortDescendingQueryValue
      ) {
        setActive(true);
      }
    } else if (sortDefaultQueryValue) {
      setActive(true);
    }
  }, [
    params,
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
      params[TABLE_SORT_QUERY_KEY] === sortAscendingQueryValue ||
      sortDefaultQueryValue === sortAscendingQueryValue
    ) {
      setDescending(false);
    } else if (params[TABLE_SORT_QUERY_KEY] === sortDescendingQueryValue) {
      setDescending(true);
    } else {
      setDescending(true);
    }
  });

  function handleSort() {
    const newParams = omit(params, [TABLE_SORT_QUERY_KEY]);

    if (!active) {
      setDescending(true);
      newParams[TABLE_SORT_QUERY_KEY] = sortDescendingQueryValue;
      setActiveSortQueryValue(sortDescendingQueryValue);
    } else {
      const val = !descending;
      const direction = val
        ? sortDescendingQueryValue
        : sortAscendingQueryValue;
      setDescending(val);
      newParams[TABLE_SORT_QUERY_KEY] = direction;
      setActiveSortQueryValue(direction);
    }

    const search = serialize(newParams);
    navigate({ search });
  }

  return (
    <Wrapper active={active} reverse={align === "right"} onClick={handleSort}>
      {children}

      {descending ? <SortDescend /> : <SortAscend />}
    </Wrapper>
  );
}
