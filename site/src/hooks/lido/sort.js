export const LIDO_SORT = {
  BLOCK_ASC: "block_asc",
  BLOCK_DESC: "block_desc",
  VALUE_ASC: "value_asc",
  VALUE_DESC: "value_desc",
  AMOUNT_ASC: "amount_asc",
  AMOUNT_DESC: "amount_desc",
  AMOUNT_OF_SHARES_ASC: "amount_of_shares_asc",
  AMOUNT_OF_SHARES_DESC: "amount_of_shares_desc",
  SHARES_ASC: "shares_asc",
  SHARES_DESC: "shares_desc",
  BALANCE_ASC: "balance_asc",
  BALANCE_DESC: "balance_desc",
  TOTAL_REWARDS_ASC: "total_rewards_asc",
  TOTAL_REWARDS_DESC: "total_rewards_desc",
};

export function toLidoSort(sortQuery) {
  const parts = String(sortQuery || "").split("_");
  const direction = parts.pop()?.toUpperCase();
  const field = parts.join("_").toUpperCase();

  if (!field || !["ASC", "DESC"].includes(direction)) {
    return;
  }

  return { field, direction };
}
