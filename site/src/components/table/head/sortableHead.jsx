import noop from "lodash.noop";
import styled, { css } from "styled-components";
import { Flex } from "../../styled/flex";
import { ReactComponent as SortAscend } from "../../icons/sort-ascend.svg";
import { ReactComponent as SortDescend } from "../../icons/sort-descend.svg";
import { useState } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import omit from "lodash.omit";
import { useNavigate } from "react-router-dom";
import { serialize } from "../../../utils/viewFuncs";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";

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
    sortQueryValue,
    sortDefaultDirection = "descending",
  } = head ?? {};

  const navigate = useNavigate();
  const params = useQueryParams();

  const [active, setActive] = useState();
  useEffectOnce(() => {
    const urlKey = params.ascendingBy || params.descendingBy;
    setActive(urlKey === sortQueryValue);
  });
  useUpdateEffect(() => {
    setActive(activeSortQueryValue === sortQueryValue);
  }, [activeSortQueryValue, sortQueryValue]);

  const [descending, setDescending] = useState(true);
  useEffectOnce(() => {
    if (params.ascendingBy === sortQueryValue) {
      setDescending(false);
    } else {
      setDescending(sortDefaultDirection === "descending");
    }
  });

  function handleSort() {
    setActiveSortQueryValue(sortQueryValue);
    const newParams = omit(params, ["ascendingBy", "descendingBy"]);

    if (!active) {
      setDescending(true);
      newParams["descendingBy"] = sortQueryValue;
    } else {
      const val = !descending;
      setDescending(val);
      newParams[val ? "descendingBy" : "ascendingBy"] = sortQueryValue;
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
