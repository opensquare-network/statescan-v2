import {
  GET_LIDO_TREASURY_ETH_INCOME,
  GET_LIDO_TREASURY_STETH_INCOME,
} from "../../services/gql/lido";
import { EMPTY_OBJECT } from "../../utils/constants";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";

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

export function useLidoTreasuryTransfersData(options = EMPTY_OBJECT) {
  const filters = options.filters || EMPTY_OBJECT;
  const type = options.type || LIDO_TREASURY_INCOME_TYPES.eth;
  const { query, field } = getTreasuryIncomeQueryConfig(type);
  const variables = useLidoServerFilterVariables({
    txHash: filters.txHash == null ? undefined : String(filters.txHash),
    withSort: type === LIDO_TREASURY_INCOME_TYPES.steth,
    defaultSortQuery: "block_desc",
  });
  return useLidoServerListQuery({
    query,
    field,
    variables,
  });
}
