function getLidoSearchUrl(term) {
  const serverUrl = process.env.REACT_APP_PUBLIC_LIDO_SERVER_URL;

  if (!serverUrl) {
    return null;
  }

  const baseUrl = new URL(serverUrl);
  const url = new URL("/search", baseUrl.origin);

  url.searchParams.set("q", term);

  return url;
}

function toLidoSearchHints(result = {}) {
  return Object.entries(result)
    .map(([type, value]) => ({
      type,
      value: value || [],
    }))
    .filter((hint) => hint.value.length);
}

export async function fetchLidoSearchHints(term) {
  const url = getLidoSearchUrl(term);

  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return [];
    }

    const result = await response.json();

    return toLidoSearchHints(result?.result || result);
  } catch {
    return [];
  }
}
