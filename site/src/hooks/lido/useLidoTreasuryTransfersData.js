import { EMPTY_OBJECT } from "../../utils/constants";
import {
  GET_LIDO_TREASURY_ETH_INCOME,
  GET_LIDO_TREASURY_STETH_INCOME,
} from "../../services/gql/lido";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { useLidoServerQuery } from "./useLidoQuery";
import {
  getLidoServerIndexerFilter,
  useLidoServerListVariables,
} from "./useLidoListVariables";
import { pickLidoFilters } from "./utils";

export const LIDO_TREASURY_INCOME_TYPES = {
  eth: "eth",
  steth: "steth",
};

const TREASURY_INCOME_QUERIES = {
  [LIDO_TREASURY_INCOME_TYPES.eth]: {
    query: GET_LIDO_TREASURY_ETH_INCOME,
    field: "treasuryEthIncome",
  },
  [LIDO_TREASURY_INCOME_TYPES.steth]: {
    query: GET_LIDO_TREASURY_STETH_INCOME,
    field: "treasuryStethIncome",
  },
};

function getTreasuryIncomeQueryConfig(type) {
  return TREASURY_INCOME_QUERIES[type] || TREASURY_INCOME_QUERIES.eth;
}

function toTreasuryTransferItem(item, type) {
  const { indexer = EMPTY_OBJECT, ...transfer } = item || EMPTY_OBJECT;
  const id = [indexer.txHash, indexer.logIndex].filter(Boolean).join("-");
  const baseItem = {
    blockNumber: indexer.blockNumber,
    blockTime: indexer.blockTimestamp,
    id,
    logIndex: indexer.logIndex,
    txHash: indexer.txHash,
  };

  if (type === LIDO_TREASURY_INCOME_TYPES.steth) {
    return {
      ...baseItem,
      stethTransfer: transfer,
    };
  }

  return {
    ...baseItem,
    ethTransfer: transfer,
  };
}

function toTreasuryTransfersResult(queryResult, field, type) {
  const queryData = queryResult.data || queryResult.previousData;
  const data = queryData?.[field];

  return {
    ...queryResult,
    data: data && {
      ...data,
      items: (data.items || []).map((item) =>
        toTreasuryTransferItem(item, type),
      ),
    },
  };
}

export function useLidoTreasuryTransfersData(options = EMPTY_OBJECT) {
  const filters = options.filters || EMPTY_OBJECT;
  const type = options.type || LIDO_TREASURY_INCOME_TYPES.eth;
  const { txHash, timeDimensionParams } = useLidoListQueryParams();
  const { query, field } = getTreasuryIncomeQueryConfig(type);
  const variables = useLidoServerListVariables({
    variables: pickLidoFilters({
      filter: getLidoServerIndexerFilter({
        txHash: String(filters.txHash ?? txHash ?? ""),
        timeDimensionParams,
      }),
    }),
  });
  const queryResult = useLidoServerQuery(query, {
    variables,
  });

  return toTreasuryTransfersResult(queryResult, field, type);
}
