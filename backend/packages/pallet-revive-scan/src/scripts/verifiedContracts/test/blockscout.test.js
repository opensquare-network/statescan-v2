const {
  buildUrl,
  parseRetryAfter,
  iterateVerifiedContractPages,
} = require("../blockscout");

const HOST = "https://blockscout.polkadot.io";

describe("blockscout api", () => {
  test("builds a url with query params", () => {
    expect(
      buildUrl(HOST, "/api/v2/smart-contracts", {
        filter: "verified",
        page: 1,
      }),
    ).toBe(`${HOST}/api/v2/smart-contracts?filter=verified&page=1`);

    expect(
      buildUrl(HOST, "/api/v2/smart-contracts", {
        filter: "verified",
        empty: "",
        missing: null,
      }),
    ).toBe(`${HOST}/api/v2/smart-contracts?filter=verified`);
  });

  test("parses retry after seconds", () => {
    expect(parseRetryAfter("2")).toBe(2000);
    expect(parseRetryAfter(null)).toBeNull();
    expect(parseRetryAfter("not a date")).toBeNull();
  });

  test("walks the pages with the next page params", async () => {
    const requests = [];
    const request = async (url) => {
      requests.push(url);
      if (requests.length === 1) {
        return {
          items: [{ address: { hash: "0x01" } }],
          next_page_params: {
            smart_contract_id: 42,
            items_count: 50,
            page: "1",
          },
        };
      }

      return { items: [{ address: { hash: "0x02" } }], next_page_params: null };
    };

    const pages = [];
    for await (const page of iterateVerifiedContractPages(
      { apiHost: HOST, maxPages: 0 },
      request,
    )) {
      pages.push(page);
    }

    expect(pages).toHaveLength(2);
    expect(pages[0].hasNext).toBe(true);
    expect(pages[1].hasNext).toBe(false);
    expect(requests[1]).toContain("filter=verified");
    expect(requests[1]).toContain("smart_contract_id=42");
    expect(requests[1]).toContain("items_count=50");
    expect(requests[1]).toContain("page=1");
  });

  test("stops at max pages", async () => {
    const request = async () => ({
      items: [{ address: { hash: "0x01" } }],
      next_page_params: { page: "1" },
    });

    const pages = [];
    for await (const page of iterateVerifiedContractPages(
      { apiHost: HOST, maxPages: 2 },
      request,
    )) {
      pages.push(page);
    }

    expect(pages).toHaveLength(2);
  });
});
