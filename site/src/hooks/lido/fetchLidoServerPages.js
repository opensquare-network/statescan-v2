import { lidoServerClient } from "./useLidoQuery";

export const LIDO_SERVER_PAGE_SIZE = 100;

const inFlightRequests = new Map();

function getQueryKey({ query, field, variables, pageSize }) {
  return JSON.stringify({
    field,
    pageSize,
    query: query?.loc?.source?.body,
    variables,
  });
}

export async function fetchLidoServerPages({
  query,
  field,
  variables = {},
  pageSize = LIDO_SERVER_PAGE_SIZE,
}) {
  const queryKey = getQueryKey({ query, field, variables, pageSize });

  if (inFlightRequests.has(queryKey)) {
    return inFlightRequests.get(queryKey);
  }

  const request = fetchLidoServerPagesWithoutCache({
    query,
    field,
    variables,
    pageSize,
  }).finally(() => {
    inFlightRequests.delete(queryKey);
  });

  inFlightRequests.set(queryKey, request);

  return request;
}

async function fetchLidoServerPagesWithoutCache({
  query,
  field,
  variables,
  pageSize,
}) {
  const items = [];
  let offset = 0;
  let total = 0;

  do {
    const result = await lidoServerClient.query({
      query,
      fetchPolicy: "no-cache",
      variables: {
        ...variables,
        limit: pageSize,
        offset,
      },
    });
    const page = result.data?.[field];
    const pageItems = page?.items || [];

    total = page?.total || 0;
    items.push(...pageItems);
    offset += pageItems.length;

    if (!pageItems.length) {
      break;
    }
  } while (offset < total);

  return items;
}
