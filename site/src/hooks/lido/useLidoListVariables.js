import { EMPTY_OBJECT, LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../useQueryParams";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { pickLidoFilters } from "./utils";

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
} = EMPTY_OBJECT) {
  const {
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
    filter: getLidoServerIndexerFilter({
      txHash: fixedTxHash ?? txHash,
      timeDimensionParams,
    }),
  });
}
