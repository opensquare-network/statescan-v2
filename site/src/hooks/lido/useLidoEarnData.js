import { useMemo } from "react";
import isNil from "lodash.isnil";
import { useParams } from "react-router-dom";
import { useQueryParams } from "../useQueryParams";
import {
  LIDO_EARN_ETH_VAULT_ADDRESS,
  LIDO_EARN_USD_VAULT_ADDRESS,
} from "../../services/evm/lido";
import {
  GET_LIDO_EARN_VAULT_DEPOSIT,
  GET_LIDO_EARN_VAULT_REDEEM,
  GET_LIDO_EARN_VAULT_DEPOSITS,
  GET_LIDO_EARN_VAULT_QUEUES,
  GET_LIDO_EARN_VAULT_REDEEMS,
  GET_LIDO_EARN_SUBVAULTS,
} from "../../services/gql/lido";
import { useLidoStakingRouterQuery } from "./useLidoQuery";

const EARN_LIST_PAGE_SIZE = 25;
const EARN_LIST_ORDER_DIRECTION = "desc";
const EARN_REQUEST_ORDER_BY = "requestTime";
const EARN_QUEUE_ORDER_BY = "blockTime";
const EARN_SUBVAULT_ORDER_BY = "blockNumber";
const CURSOR_SEPARATOR = "-";
const vaultAddresses = {
  eth: LIDO_EARN_ETH_VAULT_ADDRESS,
  usd: LIDO_EARN_USD_VAULT_ADDRESS,
};

function getVaultFilter(type, field = "vault") {
  const vaultAddress = vaultAddresses[type];

  if (!vaultAddress) {
    return null;
  }

  return {
    [field]: vaultAddress.toLowerCase(),
  };
}

function encodeCursor(item, orderBy, tieBreakerField) {
  const value = item?.[orderBy];
  const tieBreaker = item?.[tieBreakerField];

  if (isNil(value) || isNil(tieBreaker)) {
    return null;
  }

  return [value, tieBreaker].join(CURSOR_SEPARATOR);
}

function decodeCursor(cursor) {
  const cursorText = String(cursor || "");
  const separatorIndex = cursorText.indexOf(CURSOR_SEPARATOR);

  if (separatorIndex < 0) {
    return null;
  }

  const value = cursorText.slice(0, separatorIndex);
  const tieBreaker = cursorText.slice(separatorIndex + 1);

  if (!value || !tieBreaker) {
    return null;
  }

  return { value, tieBreaker };
}

function getCursorFilter(cursor, orderBy, tieBreakerField) {
  const decodedCursor = decodeCursor(cursor);

  if (!decodedCursor) {
    return {};
  }

  const { value, tieBreaker } = decodedCursor;

  return {
    or: [
      { [`${orderBy}_lt`]: value },
      { [orderBy]: value, [`${tieBreakerField}_lt`]: tieBreaker },
    ],
  };
}

function getEarnListWhere(baseWhere, cursor, orderBy, tieBreakerField) {
  if (!baseWhere) {
    return null;
  }

  const cursorFilter = getCursorFilter(cursor, orderBy, tieBreakerField);

  if (!cursorFilter.or) {
    return baseWhere;
  }

  return {
    or: cursorFilter.or.map((item) => ({ ...baseWhere, ...item })),
  };
}

function toEarnListResult(queryResult, field, orderBy, tieBreakerField, skip) {
  if (skip) {
    return {
      ...queryResult,
      data: {
        items: [],
        nextCursor: null,
      },
    };
  }

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.[field] || [];
  const hasNextPage = items.length === EARN_LIST_PAGE_SIZE;

  return {
    ...queryResult,
    data: {
      items,
      nextCursor: hasNextPage
        ? encodeCursor(items.at(-1), orderBy, tieBreakerField)
        : null,
    },
  };
}

function useLidoEarnList({
  query,
  field,
  orderBy,
  tieBreakerField,
  where: baseWhere,
}) {
  const { cursor } = useQueryParams({ parseNumbers: false });
  const where = useMemo(
    () => getEarnListWhere(baseWhere, cursor, orderBy, tieBreakerField),
    [baseWhere, cursor, orderBy, tieBreakerField],
  );
  const shouldSkip = !where;
  const variables = useMemo(
    () => ({
      first: EARN_LIST_PAGE_SIZE,
      orderBy,
      orderDirection: EARN_LIST_ORDER_DIRECTION,
      where,
    }),
    [orderBy, where],
  );
  const queryResult = useLidoStakingRouterQuery(query, {
    variables,
    skip: shouldSkip,
  });

  return toEarnListResult(
    queryResult,
    field,
    orderBy,
    tieBreakerField,
    shouldSkip,
  );
}

function useLidoEarnVaultItemData(query, field) {
  const { id = "" } = useParams();
  const queryResult = useLidoStakingRouterQuery(query, {
    variables: {
      where: {
        id,
      },
    },
    skip: !id,
  });

  return {
    ...queryResult,
    data: queryResult.data?.[field]?.[0] || null,
    id,
  };
}

export function useLidoEarnVaultRedeemsData(type) {
  const where = useMemo(() => getVaultFilter(type), [type]);

  return useLidoEarnList({
    query: GET_LIDO_EARN_VAULT_REDEEMS,
    field: "earnVaultRedeems",
    orderBy: EARN_REQUEST_ORDER_BY,
    tieBreakerField: "id",
    where,
  });
}

export function useLidoEarnVaultRedeemData() {
  return useLidoEarnVaultItemData(
    GET_LIDO_EARN_VAULT_REDEEM,
    "earnVaultRedeems",
  );
}

export function useLidoEarnVaultDepositsData(type) {
  const where = useMemo(() => getVaultFilter(type), [type]);

  return useLidoEarnList({
    query: GET_LIDO_EARN_VAULT_DEPOSITS,
    field: "earnVaultDeposits",
    orderBy: EARN_REQUEST_ORDER_BY,
    tieBreakerField: "id",
    where,
  });
}

export function useLidoEarnVaultDepositData() {
  return useLidoEarnVaultItemData(
    GET_LIDO_EARN_VAULT_DEPOSIT,
    "earnVaultDeposits",
  );
}

export function useLidoEarnVaultQueuesData(type, isDepositQueue) {
  const where = useMemo(() => {
    const vaultFilter = getVaultFilter(type);

    if (!vaultFilter) {
      return null;
    }

    return {
      ...vaultFilter,
      active: true,
      isDepositQueue,
    };
  }, [type, isDepositQueue]);

  return useLidoEarnList({
    query: GET_LIDO_EARN_VAULT_QUEUES,
    field: "earnVaultQueues",
    orderBy: EARN_QUEUE_ORDER_BY,
    tieBreakerField: "logIndex",
    where,
  });
}

export function useLidoEarnSubvaultsData(type) {
  const where = useMemo(() => getVaultFilter(type, "vaultAddress"), [type]);

  return useLidoEarnList({
    query: GET_LIDO_EARN_SUBVAULTS,
    field: "earnVaultSubvaults",
    orderBy: EARN_SUBVAULT_ORDER_BY,
    tieBreakerField: "logIndex",
    where,
  });
}
