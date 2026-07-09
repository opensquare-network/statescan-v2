import { EMPTY_OBJECT, LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../useQueryParams";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { toLidoSort } from "./sort";
import { pickLidoFilters } from "./utils";

export { toLidoSort } from "./sort";

export function getLidoServerIndexerFilter({
  txHash,
  timeDimensionParams = EMPTY_OBJECT,
}) {
  const filter = Object.fromEntries(
    Object.entries(
      pickLidoFilters({
        startBlock: timeDimensionParams.blockStart,
        endBlock: timeDimensionParams.blockEnd,
        startDate: timeDimensionParams.dateStart,
        endDate: timeDimensionParams.dateEnd,
      }),
    )
      .map(([key, value]) => [key, Number(value)])
      .filter(([, value]) => !Number.isNaN(value)),
  );

  Object.assign(filter, pickLidoFilters({ txHash }));

  if (!Object.keys(filter).length) {
    return;
  }

  return {
    timeDimension: timeDimensionParams.timeDimension,
    ...filter,
  };
}

export function useLidoServerListVariables({
  pageSize = LIST_DEFAULT_PAGE_SIZE,
  variables = EMPTY_OBJECT,
} = EMPTY_OBJECT) {
  const { page = 1 } = useQueryParams();

  return {
    limit: pageSize,
    offset: (page - 1) * pageSize,
    ...variables,
  };
}

export function useLidoServerFilterVariables({
  variables = EMPTY_OBJECT,
  address: fixedAddress,
  txHash: fixedTxHash,
  withSort = false,
  defaultSortQuery,
} = EMPTY_OBJECT) {
  const {
    sortQuery,
    txHash,
    params: { address },
    timeDimensionParams,
  } = useLidoListQueryParams();
  const filterAddress = fixedAddress || address;
  const queryVariables = { ...variables };

  if (filterAddress) {
    queryVariables.address = filterAddress;
  }

  return pickLidoFilters({
    ...queryVariables,
    ...(withSort ? { sort: toLidoSort(sortQuery || defaultSortQuery) } : {}),
    filter: getLidoServerIndexerFilter({
      txHash: fixedTxHash ?? txHash,
      timeDimensionParams,
    }),
  });
}
